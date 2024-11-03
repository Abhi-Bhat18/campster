import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DatabaseService } from '../database/database.service';
import { Database } from '../database/database.types';

@Injectable()
export class ContactListMembershipService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(private dbService: DatabaseService) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  async addContactToList(contact_list_id: string, contact_id: string) {
    return await this.db
      .insertInto('contact_list_memberships')
      .values({
        contact_id,
        contact_list_id,
        added_at: new Date().toDateString(),
      })
      .returningAll()
      .executeTakeFirst();
  }

  async getContactsOfContactList(
    contact_list_id: string,
    offset: number = 0,
    limit: number = 10,
  ) {
    return await this.db
      .selectFrom('contact_list_memberships as clm')
      .where('clm.contact_list_id', '=', contact_list_id)
      .innerJoin('contacts as c', 'c.id', 'clm.contact_id')
      .select([
        'clm.contact_list_id as contact_list_id',
        'c.id as contact_id',
        'c.first_name',
        'c.last_name',
        'c.email',
        'c.contact',
        'c.opt_in',
        'c.is_valid_email',
        'c.unsubscribed',
      ])
      .offset(offset)
      .limit(limit)
      .execute();
  }

  async deleteContactFromList(contact_list_id: string, contact_ids: string[]) {
    return await this.db
      .deleteFrom('contact_list_memberships')
      .where(({ eb, and }) =>
        and([
          eb('contact_id', 'in', contact_ids),
          eb('contact_list_id', '=', contact_list_id),
        ]),
      )
      .returningAll()
      .execute();
  }
}
