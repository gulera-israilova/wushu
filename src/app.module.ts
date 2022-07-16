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
import { DirectModule } from './direct/direct.module';
import { LobbyModule } from './lobby/lobby.module';
import {CloudinaryModule} from "./services/cloudinary/cloudinary.module";

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
    DirectModule,
    LobbyModule,
      CloudinaryModule
  ],
})
export class AppModule {}
