import { Module } from '@nestjs/common';
import { ContactListController } from './contactList.controller';
import { DatabaseModule } from '../database/database.module';
import { ContactListService } from './contactList.service';
import { ProjectAccessModule } from '../project-access/projectAccess.module';
import { ContactModule } from '../contact/contact.module';
import { ContactListMembershipService } from './contactListMembership.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    ProjectAccessModule,
    ContactModule,
    ContactListModule,
    JwtModule,
  ],
  controllers: [ContactListController],
  providers: [ContactListService, ContactListMembershipService],
  exports: [ContactListService],
})
export class ContactListModule {}
