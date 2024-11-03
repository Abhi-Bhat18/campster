import { ColumnType, Insertable, Selectable } from 'kysely';

export class EmailClickTable {
  project_id: string;
  campaign_id: string;
  clicked_at: ColumnType<Date, string | undefined, never>;
}

export type EmailClick = Selectable<EmailClickTable>;
export type NewEmailClick = Insertable<EmailClickTable>;
