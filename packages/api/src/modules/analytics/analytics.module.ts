import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { JwtModule } from '@nestjs/jwt';
import { ProjectAccessModule } from '../project-access/projectAccess.module';

@Module({
  imports: [DatabaseModule, JwtModule, ProjectAccessModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
