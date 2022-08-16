import {forwardRef, Module} from '@nestjs/common';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ClubEntity} from "./entity/club.entity";
import {UsersModule} from "../users/users.module";
import {AchievementEntity} from "../achievements/entity/achievement.entity";
import {AchievementRatingModule} from "../achievement-rating/achievement-rating.module";
import {OfpModule} from "../ofp/ofp.module";


@Module({
  imports:[TypeOrmModule.forFeature([ClubEntity]),
    forwardRef(()=>UsersModule),
    forwardRef(()=>OfpModule),
    forwardRef(()=>AchievementRatingModule),
  ],
  controllers: [ClubsController],
  providers: [ClubsService,AchievementEntity],
  exports:[ClubsService]
})
export class ClubsModule {}
