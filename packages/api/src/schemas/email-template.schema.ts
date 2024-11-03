import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface EmailTemplateTable {
  id: string;
  name: string;
  html: string;
  json: object;
  status: 'draft' | 'ready' | 'archived' | 'deleted';
  project_id: string;
  created_by: string;
  updated_at: ColumnType<Date, string, any>;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type EmailTemplate = Selectable<EmailTemplateTable>;
export type NewEmailTemplate = Insertable<EmailTemplateTable>;
export type UpdateEmailTemplate = Updateable<EmailTemplateTable>;
