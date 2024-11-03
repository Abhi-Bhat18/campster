import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface ApiKeyTable {
  api_key: string;
  project_id: string;
  created_by: string;
  expires_at: ColumnType<Date, string | undefined, string> | null;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type ApiKey = Selectable<ApiKeyTable>;
export type NewApiKey = Insertable<ApiKeyTable>;
export type ApiKeyUpdate = Updateable<ApiKeyTable>;
