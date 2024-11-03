import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Kysely, sql } from 'kysely';
import { Database } from '../database/database.types';
import { CreateProjectDto } from './dto/create-project.dto';
import { generateUlid } from 'src/utils/generators';
import { JwtService } from '@nestjs/jwt';
import { ProjectInviteDto } from './dto/project-invite.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import Handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../email/email.service';
import { UpdateProject } from '@/schemas/project.schema';
import { promises as fs } from 'fs';

@Injectable()
export class ProjectService implements OnModuleInit {
  private db: Kysely<Database>;

  constructor(
    private readonly dbService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private emailService: EmailService,
  ) {}

  onModuleInit() {
    this.db = this.dbService.getDb();
  }

  createProject = async (body: CreateProjectDto, created_by: string) => {
    const { description, name } = body;

    // create the project for the user
    const project = await this.db
      .insertInto('projects')
      .values({
        id: generateUlid(),
        name,
        description,
        created_by,
      })
      .returningAll()
      .execute();

    return project;
  };

  getProjectById = async (id: string) => {
    return this.db
      .selectFrom('projects')
      .where('projects.id', '=', id)
      .leftJoin('users', 'users.id', 'projects.created_by')
      .select([
        'projects.id',
        'name',
        'description',
        'projects.created_at',
        'projects.created_by',
        'users.first_name',
        'projects.status',
        'users.last_name',
        'projects.created_at',
        'projects.updated_at',
        'projects.default_mail_from',
      ])
      .executeTakeFirst();
  };

  getProjects = async (userId: string) => {
    const ownedProjects = this.db
      .selectFrom('projects')
      .select([
        'id',
        'name',
        'description',
        'status',
        'created_at',
        'updated_at',
      ])
      .where('created_by', '=', userId)
      .where('status', '!=', 'deleted');

    const accessibleProjects = this.db
      .selectFrom('projects')
      .innerJoin(
        'project_accesses',
        'projects.id',
        'project_accesses.project_id',
      )
      .select([
        'projects.id',
        'projects.name',
        'projects.description',
        'projects.status',
        'projects.created_at',
        'projects.updated_at',
      ])
      .where('project_accesses.user_id', '=', userId)
      .where('projects.status', '!=', 'deleted')
      .where('projects.created_by', '!=', userId);

    return await ownedProjects.union(accessibleProjects).execute();
  };

  getCreatedProjects = async (
    owner_id: string,
    offset: number = 0,
    limit: number = 10,
  ) => {
    return await this.db
      .selectFrom('projects')
      .where('created_by', '=', owner_id)
      .selectAll()
      .limit(limit)
      .offset(offset)
      .execute();
  };

  generateInviteToken = async (
    project_id: string,
    role_id: number,
    email: string,
  ) => {
    const inviteToken = this.jwtService.sign(
      { project_id, role_id, email },
      {
        secret: this.configService.get('JWT_SECRET'),
      },
    );

    return inviteToken;
  };

  updateProject = async (project_id: string, values: UpdateProject) => {
    return await this.db
      .updateTable('projects')
      .where('id', '=', project_id)
      .set({
        ...values,
        updated_at: sql`now()`,
      })
      .returningAll()
      .executeTakeFirst();
  };

  inviteToProject = async (body: ProjectInviteDto) => {
    const { project_id, email, role_id } = body;

    const [project, role] = await Promise.all([
      this.getProjectById(project_id),
      this.db
        .selectFrom('roles')
        .where('id', '=', role_id)
        .selectAll()
        .executeTakeFirst(),
    ]);

    if (!project)
      throw new HttpException('Project Not found', HttpStatus.NOT_FOUND);
    else if (!role) {
      throw new HttpException('Role Not found', HttpStatus.NOT_FOUND);
    }

    const invitationToken = await this.generateInviteToken(
      project.id,
      role_id,
      email,
    );

    const cwd = process.cwd();
    const templateContent = await fs.readFile(
      `${cwd}/src/templates/project-invite.html`,
      'utf-8',
    );

    const comipledTemplate = Handlebars.compile(templateContent);

    const htmlContent = comipledTemplate({
      email,
      project_name: project.name,
      role_name: role.name,
      invite_link: `${this.configService.get('CLIENT_HOST')}/sign-up?token=${invitationToken}`,
    });

    console.log('Html content', htmlContent);

    await this.emailService.sendEmail(
      email,
      'You’re Invited to Join the Project',
      '',
      htmlContent,
      project.default_mail_from,
    );

    return;
  };
}
