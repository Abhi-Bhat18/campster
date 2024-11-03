import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Kysely } from 'kysely';

import { Database } from '../database/database.types';
import { DatabaseService } from '../database/database.service';
import { Contact, NewContact, UpdateContact } from '@/schemas/contacts.schema';

@Injectable()
export class ContactService implements OnModuleInit {
  private readonly logger = new Logger(ContactService.name);

  private db: Kysely<Database>;
  constructor(private readonly databaseService: DatabaseService) {}

  onModuleInit() {
    this.db = this.databaseService.getDb();
  }

  async createNewContact(contact: NewContact) {
    return await this.db
      .insertInto('contacts')
      .values(contact)
      .returningAll()
      .executeTakeFirst();
  }

  async getContactByEmail(email: string): Promise<Contact> {
    return await this.db
      .selectFrom('contacts')
      .where('email', '=', email)
      .selectAll()
      .executeTakeFirst();
  }

  async updateContactById(id: string, values: UpdateContact) {
    await this.db
      .updateTable('contacts')
      .where('id', '=', id)
      .set(values)
      .returningAll()
      .executeTakeFirst();
  }
}
