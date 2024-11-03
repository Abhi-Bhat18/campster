import {
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionalService } from './transactional.services';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { NewAPIKeyDto } from './dto/generateAPIKey.dto';
import { ProjectAccessGuard } from '../project-access/projectAccessGuard';
import { APIKeyGuard } from './api-key.guard';
import { TransactionalEmailDto } from './dto/transactionalEmail.dto';

@Controller('transactionals')
export class TransactionalController {
  constructor(private readonly transactionalService: TransactionalService) {}

  @Post()
  @UseGuards(APIKeyGuard)
  async sendEmails(
    @Body() body: TransactionalEmailDto,
    @Req() request: Request,
  ) {
    return await this.transactionalService.sendTransactionalEmail(
      body,
      request.project_id,
    );
  }

  @Get()
  @UseGuards(AuthGuard, ProjectAccessGuard)
  async getTransactionalEmails(@Req() request: Request) {
    const project_id = request.project_id;
    return await this.transactionalService.getTransactionalEmails(project_id);
  }

  @Get('api-keys')
  @UseGuards(AuthGuard, ProjectAccessGuard)
  async getProjectApiKey(@Req() req: Request) {
    return await this.transactionalService.getAPIKeys(req.project_id);
  }

  @Post('api-key')
  @UseGuards(AuthGuard, ProjectAccessGuard)
  async generateApiKey(@Body() body: NewAPIKeyDto, @Req() req: Request) {
    const apiKey = this.transactionalService.generateAndInsertAPIKey(
      req.user.id,
      req.project_id,
      body.expires_at,
    );
    return apiKey;
  }

  @Delete('api-key')
  @UseGuards(AuthGuard, ProjectAccessGuard)
  async invokeAPIKey(@Query('keys') keys: string, @Req() request: Request) {
    return await this.transactionalService.invokeAPIKey(
      keys,
      request.project_id,
    );
  }
}
