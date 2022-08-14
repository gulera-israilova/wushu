import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { MAIL_CONFIG } from '../../utils/mail_config';

@Module({
  imports: [MailerModule.forRoot(MAIL_CONFIG)],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
