import {forwardRef, Module} from '@nestjs/common';
import { SubgroupsController } from './subgroups.controller';
import { SubgroupsService } from './subgroups.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubgroupEntity} from "./entity/subgroup.entity";
import {ApplicationsModule} from "../applications/applications.module";
import {SportsmenSubgroupsModule} from "../sportsmen-subgroups/sportsmen-subgroups.module";

@Module({
  imports:[TypeOrmModule.forFeature([SubgroupEntity]),
    forwardRef(() => ApplicationsModule),
    forwardRef(() => SportsmenSubgroupsModule)],
  controllers: [SubgroupsController],
  providers: [SubgroupsService],
  exports:[SubgroupsService]
})
export class SubgroupsModule {}
