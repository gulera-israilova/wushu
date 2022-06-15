import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_CONFIG } from './utils/db_config';
import { UsersModule } from './users/users.module';
import { ClubsModule } from './clubs/clubs.module';
import { MailModule } from './services/mail/mail.module';
import { SportsmenModule } from './sportsmen/sportsmen.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    UsersModule,
    ClubsModule,
    MailModule,
    SportsmenModule,
    S3Module,
  ],
})
export class AppModule {}