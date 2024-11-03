import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { ProjectAccessModule } from '../project-access/projectAccess.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    ProjectAccessModule,
    JwtModule,
    EmailModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
