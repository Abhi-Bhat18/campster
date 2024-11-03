import { Controller } from '@nestjs/common';
import { ProjectAccessService } from './projectAccess.service';

@Controller('project-access')
export class ProjectAccessController {
  constructor(private readonly projectAccessService: ProjectAccessService) {}
}
