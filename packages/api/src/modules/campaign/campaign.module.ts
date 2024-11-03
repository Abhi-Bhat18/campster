import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { EmailModule } from '../email/email.module';
import { ConfigModule } from '@nestjs/config';
import { EmailTemplateModule } from '../email-template/emaliTemplate.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    EmailModule,
    ConfigModule,
    EmailTemplateModule,
    JwtModule,
  ],
  providers: [CampaignService],
  controllers: [CampaignController],
})
export class CampaignModule {}
