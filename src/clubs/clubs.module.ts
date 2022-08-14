import {forwardRef, Module} from '@nestjs/common';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClubEntity} from "./entity/club.entity";
import {UsersModule} from "../users/users.module";
import {SportsmenModule} from "../sportsmen/sportsmen.module";
import {AchievementEntity} from "../achievements/entity/achievement.entity";


@Module({
  imports:[TypeOrmModule.forFeature([ClubEntity]),
    forwardRef(()=>UsersModule),
    forwardRef(()=>SportsmenModule),
  ],
  controllers: [ClubsController],
  providers: [ClubsService,AchievementEntity],
  exports:[ClubsService]
})
export class ClubsModule {}
