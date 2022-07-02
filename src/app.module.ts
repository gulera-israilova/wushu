import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from './utils/db_config';
import { UsersModule } from './users/users.module';
import { ClubsModule } from './clubs/clubs.module';
import { MailModule } from './services/mail/mail.module';
import { SportsmenModule } from './sportsmen/sportsmen.module';
import { S3Module } from './s3/s3.module';
import { NewsModule } from './news/news.module';
import { EventsModule } from './events/events.module';
import { MessagesModule } from './messages/messages.module';
import { DialogModule } from './dialog/dialog.module';
import { GroupChatModule } from './group_chat/group_chat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    UsersModule,
    ClubsModule,
    MailModule,
    SportsmenModule,
    S3Module,
    NewsModule,
    EventsModule,
    MessagesModule,
    DialogModule,
    GroupChatModule,
  ],
})
export class AppModule {}