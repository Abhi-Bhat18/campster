import { ColumnType, Insertable, Selectable } from 'kysely';

export interface ContactListMembershipTable {
  contact_id: string;
  contact_list_id: string;
  added_at: ColumnType<Date, string, never>;
}

export type contactListMembership = Selectable<ContactListMembershipTable>;
export type NewContactListJunction = Insertable<ContactListMembershipTable>;
