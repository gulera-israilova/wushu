import { MailerOptions } from '@nestjs-modules/mailer';

export const MAIL_CONFIG: MailerOptions = {
  transport: {
    host: 'smtp.gmail.com',
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
  defaults: {
    from: `"Wushu" <${process.env.MAIL_USER}>`,
  },
};
