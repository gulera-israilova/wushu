import {forwardRef, Module} from '@nestjs/common';
import { SportsmenController } from './sportsmen.controller';
import { SportsmenService } from './sportsmen.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SportsmanEntity} from "./entity/sportsman.entity";
import {S3Module} from "../s3/s3.module";
import {ClubsModule} from "../clubs/clubs.module";
import {AchievementsModule} from "../achievements/achievements.module";
import {OfpModule} from "../ofp/ofp.module";
import {AchievementRatingModule} from "../achievement-rating/achievement-rating.module";


@Module({
  imports: [TypeOrmModule.forFeature([SportsmanEntity]),
    forwardRef(() => S3Module),
    forwardRef(()=>ClubsModule),
    forwardRef(()=>AchievementsModule),
    forwardRef(() => OfpModule),
    forwardRef(()=>AchievementRatingModule)
  ],
  controllers: [SportsmenController],
  providers: [SportsmenService],
  exports: [SportsmenService]
})
export class SportsmenModule {}
