import { ColumnType, Insertable, Selectable } from 'kysely';

export interface EmailViewTable {
  project_id: string;
  campaign_id: string;
  opened_at: ColumnType<Date, string | undefined, never>;
}

export type EmailView = Selectable<EmailViewTable>;
export type NewEmailView = Insertable<EmailViewTable>;
