import { Module } from '@nestjs/common';
import { DirectService } from './direct.service';
import { DirectController } from './direct.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {DirectRepository} from './entities/direct.entity';
import {AuthModule} from "../auth/auth.module";
import {UserRepo} from "../users/entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DirectRepository,UserRepo]),AuthModule],
  controllers: [DirectController],
  providers: [DirectService],
})
export class DirectModule {}
