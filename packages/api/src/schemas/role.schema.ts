import { Generated, Selectable, Insertable, Updateable } from 'kysely';

export type PermissionAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'manage';

export type PermissionResource =
  | 'organization'
  | 'project'
  | 'analytics'
  | 'campaigns'
  | 'contact-lists'
  | 'templates'
  | 'transactionals';

export type Permission = `${PermissionResource}:${PermissionAction}`;

export interface RoleTable {
  id: Generated<number>;
  name: string;
  description: string;
  permissions: Permission[];
  created_at: Date;
  updated_at: Date;
}

export type Role = Selectable<RoleTable>;
export type NewRole = Insertable<RoleTable>;
export type RoleUpdate = Updateable<RoleTable>;
