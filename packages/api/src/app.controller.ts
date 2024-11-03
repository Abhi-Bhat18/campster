import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// import { randomBytes } from 'crypto';

@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  // @Get('api-key')
  // generateAPIKey() {
  //   const apiKey = randomBytes(32).toString('hex');
  //   return apiKey;
  // }
}
