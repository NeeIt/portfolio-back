import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { IEmailParams } from '../../interfaces/email.interface';
import { RateLimitMiddleware } from '../../middlewares/rate-limit.middleware';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send')
  @UseGuards(RateLimitMiddleware)
  async sendEmail(@Body() emailParams: IEmailParams) {
    try {
      await this.emailService.sendEmail(emailParams);
    } catch (err) {
      return { status: false, error: err };
    }
    return { status: true };
  }
}
