import {forwardRef, Module} from '@nestjs/common';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AchievementEntity} from "./entity/achievement.entity";
import {SportsmenModule} from "../sportsmen/sportsmen.module";
import {AchievementRatingModule} from "../achievement-rating/achievement-rating.module";

@Module({
  imports: [TypeOrmModule.forFeature([AchievementEntity]),
    forwardRef(()=>SportsmenModule),
    forwardRef(()=>AchievementRatingModule)],
  controllers: [AchievementsController],
  providers: [AchievementsService,AchievementEntity],
  exports:[AchievementsService]
})
export class AchievementsModule {}
