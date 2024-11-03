import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BounceService } from './bounce.service';
import { BounceGuard } from './bounce.guard';

@Controller('bounce')
export class BounceController {
  constructor(private bounceService: BounceService) {}

  @Get()
  async checkAPIKey() {
    return await this.bounceService.apiKeyCheck();
  }

  @Post()
  @UseGuards(BounceGuard)
  async handleBounce(@Body() body: any) {
    return await this.bounceService.handleBounce(body);
  }
}
