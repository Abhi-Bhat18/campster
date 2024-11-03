import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { randomBytes } from 'crypto';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { generateUlid } from '@/utils/generators';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';
import { TransactionalEmailDto } from './dto/transactionalEmail.dto';

@Injectable()
export class TransactionalService implements OnModuleInit {
  private db: Kysely<Database>;
  private processing = false;
  private logger = new Logger(TransactionalService.name);

  constructor(
    private readonly dbService: DatabaseService,
    private readonly emailService: EmailService,
  ) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async processTransactionEmails() {
    if (this.processing) {
      this.logger.debug('Processing emails already');
      return;
    }

    try {
      this.processing = true;

      // get all the mails and queue to to send the emails
      const emails = await this.db
        .selectFrom('transactional_emails')
        .where('status', '=', 'queued')
        .selectAll()
        .limit(20)
        .execute();

      if (emails.length === 0) {
        return;
      }

      const emailPromises = [];

      emails.forEach((email) => {
        const info = this.emailService.sendTransactionalEmails({
          from: email.from_email,
          to: email.to_email,
          subject: email.subject,
          replyTo: email.reply_to,
          text: email.content_text,
          html: email.content_html,
        });
        emailPromises.push(info);
      });

      // check wether the emails are sent or rejected then remove that;
      const processedEmails = await Promise.allSettled(emailPromises);

      const updates = processedEmails.map((result, i) => ({
        id: emails[i].id,
        status: result.status,
      }));

      await this.db.transaction().execute(async (trx) => {
        for (const { id, status } of updates) {
          await trx
            .updateTable('transactional_emails')
            .set({
              status,
              sent_at: new Date().toISOString(),
            })
            .where('id', '=', id)
            .execute();
        }
      });

      this.logger.debug('Emails processed successfully');
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.processing = false;
    }
  }

  async sendTransactionalEmail(
    body: TransactionalEmailDto,
    project_id: string,
  ) {
    const {
      template_id,
      template_data,
      content_html,
      content_text,
      event_name,
      from_email,
      to_email,
      reply_to,
      subject,
    } = body;

    // check template id exists
    let template = content_html;
    if (template_id) {
      const savedTeamplate = await this.db
        .selectFrom('email_templates')
        .where('project_id', '=', project_id)
        .where('email_templates.id', '=', template_id)
        .select('html')
        .executeTakeFirst();

      if (!savedTeamplate) throw new NotFoundException();

      template = savedTeamplate.html;
    }

    if (template_data) {
      const compiledTemplate = Handlebars.compile(template);
      template = compiledTemplate(template_data);
    }

    const email = await this.db
      .insertInto('transactional_emails')
      .values({
        id: generateUlid(),
        from_email,
        to_email,
        reply_to,
        subject,
        content_html: template,
        content_text: content_text,
        project_id,
        event_name,
        template_id,
        status: 'queued',
      })
      .returningAll()
      .executeTakeFirst();

    return email;
  }

  async getTransactionalEmails(project_id: string, offset = 0, limit = 10) {
    return await this.db
      .selectFrom('transactional_emails')
      .where('project_id', '=', project_id)
      .where('status', '=', 'fulfilled')
      .selectAll()
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async getAPIKeys(project_id: string, limit: number = 10, offset: number = 0) {
    return await this.db
      .selectFrom('api_keys')
      .where('project_id', '=', project_id)
      .leftJoin('users', 'users.id', 'api_keys.created_by')
      .select([
        'api_key',
        'expires_at',
        'first_name',
        'last_name',
        'created_by',
        'api_keys.created_at',
      ])
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async generateAndInsertAPIKey(
    userId: string,
    projectId: string,
    expiry?: Date,
  ) {
    const apiKey = this.createUniqueApiKey();

    let expires_at = new Date();
    if (!expiry) {
      expires_at.setDate(expires_at.getDate() + 365);
    } else {
      expires_at = expiry;
    }

    const insertedAPIKey = await this.db
      .insertInto('api_keys')
      .values({
        api_key: apiKey,
        expires_at: expires_at.toISOString(),
        project_id: projectId,
        created_by: userId,
      })
      .returningAll()
      .executeTakeFirst();

    return insertedAPIKey;
  }

  async validateAPIKey(apiKey: string) {
    const result = await this.db
      .selectFrom('api_keys')
      .where('api_key', '=', apiKey)
      .select(['api_key', 'expires_at', 'project_id'])
      .executeTakeFirst();

    // check is api key is valid or not
    const now = new Date();
    const isValid = result && new Date(result.expires_at) > now;
    return { isValid, project_id: result.project_id };
  }

  async invokeAPIKey(keys: string, project_id: string) {
    const api_keys = keys.split(',');
    return await this.db
      .deleteFrom('api_keys')
      .where('project_id', '=', project_id)
      .where('api_key', 'in', api_keys)
      .returning('api_key')
      .execute();
  }

  private createUniqueApiKey(): string {
    // Generate a random string of 32 bytes and convert it to a hex string
    return randomBytes(32).toString('hex');
  }
}
