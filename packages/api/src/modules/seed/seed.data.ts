interface Role {
  name: string;
  description: string;
}
import { Permission } from '@/schemas/role.schema';
export const roles: (Role & { permissions: Permission[] })[] = [
  {
    name: 'owner',
    description:
      'Full access and control over the organization and all project',
    permissions: [
      'organization:manage',
      'project:manage',
      'campaigns:manage',
      'contact-lists:manage',
      'transactionals:manage',
      'analytics:manage',
      'templates:manage',
    ],
  },
  {
    name: 'admin',
    description:
      'Administrative access with high-level permissions for the project',
    permissions: [
      'project:manage',
      'campaigns:manage',
      'contact-lists:manage',
      'transactionals:manage',
      'templates:manage',
      'analytics:manage',
    ],
  },
  {
    name: 'manager',
    description: 'Manage projects and teams',
    permissions: [
      'analytics:manage',
      'project:read',
      'contact-lists:manage',
      'transactionals:manage',
      'templates:manage',
    ],
  },
  {
    name: 'user',
    description: 'Manage features like campaigns, transactions,',
    permissions: [
      'campaigns:read',
      'transactionals:manage',
      'contact-lists:read',
      'templates:manage',
    ],
  },
];
