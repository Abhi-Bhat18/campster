import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';
import { Kysely } from 'kysely';
import { Database } from '../database/database.types';
import { roles } from './seed.data';
import { generateUlid } from '@/utils/generators';

@Injectable()
export class SeedService implements OnModuleInit {
  private db: Kysely<Database>;
  private owner_id: number;
  private user_id: string;

  constructor(private readonly databaseService: DatabaseService) {}

  onModuleInit() {
    this.db = this.databaseService.getDb();
  }

  async seed() {
    await this.seedRoles();
    await this.seedDefaultUser();
    await this.setDefaultProject();
  }

  private async seedRoles() {
    for (const role of roles) {
      const existingRole = await this.db
        .selectFrom('roles')
        .selectAll()
        .where('name', '=', role.name)
        .executeTakeFirst();

      if (existingRole && existingRole.name == 'owner') {
        this.owner_id = existingRole.id;
      }

      if (!existingRole) {
        const newRole = await this.db
          .insertInto('roles')
          .values({
            name: role.name,
            description: role.description,
            permissions: role.permissions,
          })
          .returningAll()
          .executeTakeFirst();

        if (newRole.name == 'owner') {
          this.owner_id = newRole.id;
        }
      }
    }
  }

  private async seedDefaultUser() {
    const existingUser = await this.db
      .selectFrom('users')
      .selectAll()
      .executeTakeFirst();

    if (existingUser) {
      this.user_id = existingUser.id;
    }

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('adminpassword', 10);

      const user = await this.db
        .insertInto('users')
        .values({
          id: generateUlid(),
          first_name: 'super',
          last_name: 'admin',
          email: 'admin@example.com',
          password: hashedPassword,
          role_id: this.owner_id,
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      this.user_id = user.id;

      console.log('Default user created successfully');
      console.log('Email', 'admin@example.com');
      console.log('Password', 'adminpassword');
    }
  }

  private async setDefaultProject() {
    const projectExist = await this.db
      .selectFrom('projects')
      .selectAll()
      .executeTakeFirst();

    if (!projectExist) {
      const project = await this.db
        .insertInto('projects')
        .values({
          id: generateUlid(),
          name: 'Default Project',
          description: 'Default project',
          created_by: this.user_id,
          default_mail_from: 'Admin <noreply@mail.domain.com>',
          domail: 'example-domain.com',
          status: 'active',
        })
        .returningAll()
        .executeTakeFirst();

      // create the project access
      await this.db
        .insertInto('project_accesses')
        .values({
          id: generateUlid(),
          project_id: project.id,
          role_id: this.owner_id,
          user_id: this.user_id,
        })
        .execute();

      console.log('Project and project access created successfully');
    }
  }
}
