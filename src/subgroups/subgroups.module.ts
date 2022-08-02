import { Module } from '@nestjs/common';
import { SubgroupsController } from './subgroups.controller';
import { SubgroupsService } from './subgroups.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SubgroupEntity} from "./entity/subgroup.entity";

@Module({
  imports:[TypeOrmModule.forFeature([SubgroupEntity])],
  controllers: [SubgroupsController],
  providers: [SubgroupsService]
})
export class SubgroupsModule {}
