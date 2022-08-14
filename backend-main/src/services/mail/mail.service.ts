import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(target: string, message: string) {
    message += `\n${new Date().toISOString().split('T').pop()}\n\nWushu`;
    await this.mailerService.sendMail({
      to: target,
      subject: 'Wushu Federation',
      text: message,
    });
  }
}
