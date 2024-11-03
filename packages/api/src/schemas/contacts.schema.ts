import { ColumnType, Selectable, Updateable, Insertable } from 'kysely';

export interface ContactTable {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_valid_email: boolean;
  contact: string;
  attributes: object;
  opt_in: boolean;
  unsubscribed: boolean;
  contact_list_id: string;
  updated_at: ColumnType<Date, string, any>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Contact = Selectable<ContactTable>;
export type UpdateContact = Updateable<ContactTable>;
export type NewContact = Insertable<ContactTable>;
