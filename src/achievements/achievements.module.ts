import {forwardRef, Module} from '@nestjs/common';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AchievementEntity} from "./entity/achievement.entity";
import {SportsmenModule} from "../sportsmen/sportsmen.module";

@Module({
  imports: [TypeOrmModule.forFeature([AchievementEntity]),
    forwardRef(()=>SportsmenModule)],
  controllers: [AchievementsController],
  providers: [AchievementsService,AchievementEntity],
  exports:[AchievementsService]
})
export class AchievementsModule {}
