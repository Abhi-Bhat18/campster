import {
  Controller,
  Query,
  UseGuards,
  Post,
  Get,
  Req,
  Body,
  UnauthorizedException,
  Param,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  Put,
  Delete,
} from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import multer from 'multer';

import { Request, Express } from 'express';
import { ContactListService } from './contactList.service';
import { AuthGuard } from '../auth/auth.guard';
import { ContactListQueryDto } from './dto/contactListQuery.dto';
import { ProjectAccessService } from '../project-access/projectAccess.service';
import { ContactListDto } from './dto/contactList.dto';
import { generateUlid } from '@/utils/generators';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmailSearchQueryDto } from '../email-template/dto/emailTemplateQuery.dto';
import { queryDto } from '@/utils/queryDto';
import { ContactListMembershipService } from './contactListMembership.service';
import { ContactService } from '../contact/contact.service';
import { CreateContactDto } from './dto/contact.dto';
import { UpdateContactListDto } from './dto/updateContactList.dto';
import { RemoveContactsDto } from './dto/removeContacts.dto';
import { ProjectAccessGuard } from '../project-access/projectAccessGuard';

@Controller('contact-lists')
@UseGuards(AuthGuard, ProjectAccessGuard)
export class ContactListController {
  constructor(
    private contactListService: ContactListService,
    private contactService: ContactService,
    private projectAccessService: ProjectAccessService,
    private contactListMembershipSerivice: ContactListMembershipService,
  ) {}

  @Get()
  async getAllContactLists(
    @Query() query: ContactListQueryDto,
    @Req() req: Request,
  ) {
    const { project_id } = query;

    // check whether access exists or not
    const projectAccess = await this.projectAccessService.getProjectAccess(
      project_id,
      req.user.id,
    );

    if (!projectAccess)
      throw new UnauthorizedException('Does not have access to the Project');

    const lists = await this.contactListService.getContactLists(query);
    return lists;
  }

  @Post()
  async createContactList(@Body() body: ContactListDto, @Req() req: Request) {
    const { project_id } = body;

    const projectAccess = await this.projectAccessService.getProjectAccess(
      project_id,
      req.user.id,
    );

    if (!projectAccess || projectAccess.role_id > 3) {
      throw new UnauthorizedException('Does not have enough access');
    }

    const newList = await this.contactListService.createContactList({
      id: generateUlid(),
      ...body,
      status: 'active',
      created_by: req.user.id,
    });

    return newList;
  }

  @Delete()
  async archiveContactLists(
    @Query('lists') lists: string,
    @Req() request: Request,
  ) {
    return await this.contactListService.archiveLists(
      lists,
      request.project_id,
    );
  }

  @Get('search')
  async searchByName(@Query() query: EmailSearchQueryDto) {
    const { search } = query;

    return await this.contactListService.searchByName(search);
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importContacts(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { contact_list_id: string },
  ) {
    const { contact_list_id } = body;

    // check contact list exists or not
    const contactListExists =
      await this.contactListService.getAContactList(contact_list_id);

    if (!contactListExists) throw new NotFoundException();

    await this.contactListService.decodeCSV(file.buffer, contact_list_id);

    // update the contacts count in the contact list
    const updateContactList =
      this.contactListService.updateContactListContactsCount(
        contactListExists.id,
      );

    return updateContactList;
  }

  @Get('/contacts/:id')
  async getContactsOfContactList(
    @Param('id') id: string,
    @Query() query: queryDto,
  ) {
    const { page_limit, page } = query;

    return await this.contactListMembershipSerivice.getContactsOfContactList(
      id,
      page,
      page_limit,
    );
  }

  @Post('/contact')
  async addAContact(@Body() body: CreateContactDto) {
    const { email, contact_list_id } = body;
    delete body.contact_list_id;

    const contactExists = await this.contactService.getContactByEmail(email);

    let newContact;

    if (contactExists) {
      await this.contactListMembershipSerivice.addContactToList(
        contact_list_id,
        contactExists.id,
      );
    } else {
      newContact = await this.contactService.createNewContact({
        id: generateUlid(),
        ...body,
      });

      await this.contactListMembershipSerivice.addContactToList(
        contact_list_id,
        newContact.id,
      );
    }

    await this.contactListService.updateContactListContactsCount(
      contact_list_id,
    );

    return newContact;
  }

  @Put('/remove-contacts')
  async deleteContactFromList(@Body() body: RemoveContactsDto) {
    const { contact_list_id, contact_ids } = body;

    const deletedContact =
      await this.contactListMembershipSerivice.deleteContactFromList(
        contact_list_id,
        contact_ids,
      );

    if (!deletedContact) throw new NotFoundException();
    this.contactListService.updateContactListContactsCount(contact_list_id);
    return deletedContact;
  }

  @Put(':id')
  async updateContactList(
    @Param('id') id: string,
    @Body() body: UpdateContactListDto,
  ) {
    return await this.contactListService.updateContactList(id, body);
  }

  @Delete(':id')
  async deleteContacts(@Param('id') id: string) {
    return await this.contactListService.deleteContactList(id);
  }

  @Get(':id')
  async getAContactList(@Param('id') id: string) {
    return await this.contactListService.getAContactList(id);
  }
}
