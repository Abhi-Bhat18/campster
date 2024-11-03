import { ColumnType, Selectable, Insertable, Updateable } from 'kysely';

export interface ProjectTable {
  id: string;
  name: string;
  description: string;
  created_by: string;
  status: 'active' | 'in-active' | 'deleted';
  domail: string | null;
  default_mail_from: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string>;
}

export type Project = Selectable<ProjectTable>;
export type NewProject = Insertable<ProjectTable>;
export type UpdateProject = Updateable<ProjectTable>;
