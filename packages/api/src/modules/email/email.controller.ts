import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('/open')
  async emailOpened(@Query('token') token: string, @Res() res: Response) {
    await this.emailService.emailOpened(token);
    res.setHeader('Content-Type', 'image/png');

    const pixelBuffer = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4, 0x89, 0x00, 0x00, 0x00,
      0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0xda, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);
    res.send(pixelBuffer);
    return;
  }

  @Get('/click')
  async trackClickAndRedirect(
    @Query('token') token: string,
    @Res() res: Response,
  ) {
    const redirectUrl = await this.emailService.trackEmailClick(token);
    res.redirect(redirectUrl);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getCampaignEmails(@Param('id') id: string) {
    return this.emailService.getCampaignEmails(id);
  }
}
