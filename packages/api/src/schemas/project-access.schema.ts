import { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

export interface ProjectAccessTable {
  id: string;
  project_id: string;
  user_id: string;
  role_id: number;
  created_at: ColumnType<Date, string | undefined, never>;
}

export type ProjectAccess = Selectable<ProjectAccessTable>;
export type NewProjectAccess = Insertable<ProjectAccessTable>;
export type ProjectAccessUpdate = Updateable<ProjectAccessTable>;
