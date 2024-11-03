import { Module } from '@nestjs/common';
import { ProjectAccessService } from './projectAccess.service';
import { ProjectAccessController } from './projectAccess.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectAccessController],
  providers: [ProjectAccessService],
  exports: [ProjectAccessService],
})
export class ProjectAccessModule {}
