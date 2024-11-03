import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProjectAccessModule } from '../project-access/projectAccess.module';
import { EmailTemplateController } from './eamilTemplate.controller';
import { EmailTemplateService } from './emailTemplate.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, ProjectAccessModule, JwtModule],
  controllers: [EmailTemplateController],
  providers: [EmailTemplateService],
  exports: [EmailTemplateService],
})
export class EmailTemplateModule {}
