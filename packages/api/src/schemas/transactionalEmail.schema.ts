import { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

export interface TransactionalEmailTable {
  id: string;
  to_email: string;
  from_email: string;
  reply_to: string;
  subject: string;
  event_name: string;
  content_html: string;
  content_text: string;
  headers: object;
  project_id: string;
  template_id: string | null;
  template_data: object;
  status: 'queued' | 'fulfilled' | 'bounced' | 'rejected';
  updated_at: ColumnType<Date, string | undefined, never>;
  sent_at: ColumnType<Date, string | undefined, string>;
}

export type TransactionalEmail = Selectable<TransactionalEmailTable>;
export type NewTransactionalEmail = Insertable<TransactionalEmailTable>;
export type UpdateTransactionalEmail = Updateable<TransactionalEmailTable>;
