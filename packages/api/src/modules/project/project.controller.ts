import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { Request } from 'express';
import { ProjectAccessService } from '../project-access/projectAccess.service';
import { JwtService } from '@nestjs/jwt';
import { ProjectInviteDto } from './dto/project-invite.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('project')
@UseGuards(AuthGuard)
export class ProjectController {
  constructor(
    jwtService: JwtService,
    private readonly projectService: ProjectService,
    private readonly projectAccessService: ProjectAccessService,
  ) {}

  @Get()
  async getProjects(@Req() req: Request) {
    return this.projectService.getProjects(req.user.id);
  }

  @Post('')
  async createAProject(@Body() body: CreateProjectDto, @Req() req: Request) {
    return this.projectService.createProject(body, req.user.id);
  }

  @Get('access/:id')
  async getAllProjectAccess(@Param('id') id: string) {
    return this.projectAccessService.getAllProjectAccess(id);
  }

  @Get(':id')
  async getAProject(@Param('id') id: string) {
    const project = await this.projectService.getProjectById(id);
    return project;
  }

  @Post('invite')
  async inviteUserThroughEmail(@Body() body: ProjectInviteDto) {
    return await this.projectService.inviteToProject(body);
  }

  @Put()
  async updateAProject(@Body() body: UpdateProjectDto) {
    const { project_id, name, description, default_mail_from } = body;
    return await this.projectService.updateProject(project_id, {
      name,
      description,
      default_mail_from,
    });
  }

  // @Get('/access/:id')
  // async getProjectACcess(@Param() id: string) {}

  // @Post('/access')
  // async giveProjectAccess(
  //   @Body() body: CreateProjectAccessDto,
  //   @Req() req: Request,
  // ) {
  //   const project = await this.projectService.getProjectById(body.projectId);

  //   if (!project)
  //     throw new HttpException('Project Not found', HttpStatus.NOT_FOUND);

  //   if (project.owner_id === body.projectId)
  //     throw new HttpException('Invalid Request', HttpStatus.BAD_REQUEST);

  //   const user = await this.userService.findById(body.userId);

  //   if (!user)
  //     throw new HttpException('User does not exists', HttpStatus.NOT_FOUND);

  //   // check project access already exists or not
  //   const projectAccessExists =
  //     await this.projectAccessService.getUserProjectAccess(
  //       body.projectId,
  //       body.userId,
  //     );

  //   if (projectAccessExists)
  //     throw new HttpException(
  //       'Project Access already exists',
  //       HttpStatus.CONFLICT,
  //     );

  //   return await this.projectAccessService.createProjectAccess(body);
  // }
}
