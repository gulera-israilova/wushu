import {forwardRef, Module} from '@nestjs/common';
import { SportsmenSubgroupsController } from './sportsmen-subgroups.controller';
import { SportsmenSubgroupsService } from './sportsmen-subgroups.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SportsmanSubgroupEntity} from "./entity/sportsman-subgroup.entity";
import {SubgroupsModule} from "../subgroups/subgroups.module";

@Module({
  imports: [TypeOrmModule.forFeature([SportsmanSubgroupEntity]),
    forwardRef(() => SubgroupsModule)],
  controllers: [SportsmenSubgroupsController],
  providers: [SportsmenSubgroupsService],
  exports:[SportsmenSubgroupsService]
})
export class SportsmenSubgroupsModule {}
