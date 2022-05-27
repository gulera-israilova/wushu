import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DB_CONFIG} from './utils/db_config';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
