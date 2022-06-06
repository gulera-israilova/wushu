import {forwardRef, Module} from '@nestjs/common';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClubEntity} from "./entity/club.entity";
import {UsersModule} from "../users/users.module";


@Module({
  imports:[TypeOrmModule.forFeature([ClubEntity]),
    forwardRef(()=>UsersModule) ],
  controllers: [ClubsController],
  providers: [ClubsService],
  exports:[ClubsService]
})
export class ClubsModule {}
