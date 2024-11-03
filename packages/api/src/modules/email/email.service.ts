import {
  Injectable,
  UnauthorizedException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Kysely, sql } from 'kysely';
import { Database } from '../database/database.types';
import { DatabaseService } from '../database/database.service';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

type MailOptions = {
  from: string;
  to: string;
  replyTo?: string;
  headers?: Record<string, string>;
  subject: string;
  text: string;
  html: string;
  list?:  Record<string, string>;
};

@Injectable()
export class EmailService implements OnModuleInit {
  private db: Kysely<Database>;
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);
  constructor(
    private readonly dbService: DatabaseService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async getCampaignEmails(
    campaign_id: string,
    limit: number = 10,
    offset: number = 0,
  ) {
    return await this.db
      .selectFrom('emails')
      .where('campaign_id', '=', campaign_id)
      .selectAll()
      .offset(offset)
      .limit(limit)
      .execute();
  }

  sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html: string,
    mail_from: string,
    unsubscribeUrl?: string,
  ) => {
    let mailOptions: MailOptions = {
      from: mail_from,
      to,
      subject,
      text,
      html,
    };

    if (unsubscribeUrl) {
      mailOptions = {
        ...mailOptions,
        list: {
          url: unsubscribeUrl,
          comment: 'Are you sure about unsubscribe to the list',
        },
      };
    }
    console.log('Mail options', mailOptions);

    const info = await this.transporter.sendMail(mailOptions);
    return info;
  };

  sendTransactionalEmails = async (mailOptions: MailOptions) => {
    const info = await this.transporter.sendMail(mailOptions);
    return info;
  };

  async emailOpened(token: string) {
    const verifiedToken = this.jwtService.verify(token, {
      secret: this.configService.get('JWT_SECRET'),
    });

    const { campaign_id } = verifiedToken;

    this.db
      .insertInto('email_views')
      .values({
        campaign_id: campaign_id,
        opened_at: new Date().toISOString(),
      })
      .executeTakeFirst();

    this.updateEmailView(campaign_id);
    return;
  }

  async trackEmailClick(token: string) {
    let verifiedToken;
    try {
      verifiedToken = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException();
    }

    // create a new click record
    await this.db
      .insertInto('email_clicks')
      .values({
        campaign_id: verifiedToken.campaign_id,
      })
      .execute();

    this.updateEmailClick(verifiedToken.campaign_id);

    return verifiedToken.originalURL;
  }

  private async updateEmailClick(campaign_id: string) {
    try {
      await this.db
        .updateTable('campaigns')
        .where('campaigns.id', '=', campaign_id)
        .set({
          total_clicks: sql`total_clicks + 1`,
        })
        .executeTakeFirst();
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async updateEmailView(campaign_id: string) {
    try {
      await this.db
        .updateTable('campaigns')
        .where('campaigns.id', '=', campaign_id)
        .set({
          total_opens: sql`total_opens + 1`,
        })
        .executeTakeFirst();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async deleteEmails() {
    return this.db.deleteFrom('emails').returning('id').execute();
  }
}
