import {forwardRef, Module} from '@nestjs/common';
import { SubgroupsController } from './subgroups.controller';
import { SubgroupsService } from './subgroups.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubgroupEntity} from "./entity/subgroup.entity";
import {ApplicationsModule} from "../applications/applications.module";

@Module({
  imports:[TypeOrmModule.forFeature([SubgroupEntity]),
    forwardRef(() => ApplicationsModule)],
  controllers: [SubgroupsController],
  providers: [SubgroupsService],
  exports:[SubgroupsService]
})
export class SubgroupsModule {}
