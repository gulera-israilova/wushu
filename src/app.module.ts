import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DB_CONFIG} from './utils/db_config';

@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
