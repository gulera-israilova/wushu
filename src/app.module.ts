import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DB_CONFIG} from './utils/db_config';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TypeOrmModule.forRoot(DB_CONFIG), UsersModule]
})
export class AppModule {}
