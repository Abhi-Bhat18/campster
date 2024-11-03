import { Selectable, ColumnType, Insertable, Updateable } from 'kysely';

export interface ContactListTable {
  id: string;
  name: string;
  description: string;
  email_type: 'public' | 'private';
  email_opt_in: 'single' | 'double';
  status: 'active' | 'archive';
  created_by: string;
  project_id: string;
  total_contacts: number;
  updated_at: ColumnType<Date, string, any>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type ContactList = Selectable<ContactListTable>;
export type NewContactList = Insertable<ContactListTable>;
export type UpdateContactList = Updateable<ContactListTable>;
