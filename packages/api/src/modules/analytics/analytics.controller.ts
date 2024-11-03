import { Controller, Get, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ProjectAccessGuard } from '../project-access/projectAccessGuard';
import { AuthGuard } from '../auth/auth.guard';

@Controller('analytics')
@UseGuards(AuthGuard, ProjectAccessGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('dashboard')
  async getDashBoardCounts() {
    return await this.analyticsService.getDashBoardCounts();
  }

  @Get('events')
  async getEventsGraph() {
    return await this.analyticsService.getEventsGraph();
  }
}
