import {forwardRef, Module} from '@nestjs/common';
import { AchievementRatingController } from './achievement-rating.controller';
import { AchievementRatingService } from './achievement-rating.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AchievementRatingEntity} from "./entity/achievement-rating.entity";
import {AchievementsModule} from "../achievements/achievements.module";
import {SportsmenModule} from "../sportsmen/sportsmen.module";
import {ClubsModule} from "../clubs/clubs.module";

@Module({
  imports: [TypeOrmModule.forFeature([AchievementRatingEntity]),
    forwardRef(()=>AchievementsModule),
    forwardRef(()=>SportsmenModule),
    forwardRef(()=>ClubsModule),
  ],
  controllers: [AchievementRatingController],
  providers: [AchievementRatingService],
  exports:[AchievementRatingService]
})
export class AchievementRatingModule {}
