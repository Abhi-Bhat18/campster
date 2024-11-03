import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface EmailTable {
  id: string;
  campaign_id: string;
  email: string;
  transaction_id: string;
  status: 'sent' | 'failed' | 'rejected' | 'bounced';
  updated_at: ColumnType<Date, string, any>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type Email = Selectable<EmailTable>;
export type NewEmail = Insertable<EmailTable>;
export type UpdateEmail = Updateable<EmailTable>;
