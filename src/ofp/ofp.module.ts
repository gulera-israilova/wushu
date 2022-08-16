import {forwardRef, Module} from '@nestjs/common';
import { OfpController } from './ofp.controller';
import { OfpService } from './ofp.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OfpEntity} from "./entity/ofp.entity";
import {StandardsModule} from "../standards/standards.module";
import {SportsmenModule} from "../sportsmen/sportsmen.module";
import {ClubsModule} from "../clubs/clubs.module";

@Module({
  imports:[
      TypeOrmModule.forFeature([OfpEntity]),
   forwardRef(() => StandardsModule),
   forwardRef(() => SportsmenModule),
   forwardRef(() => ClubsModule),
    ],
  controllers: [OfpController],
  providers: [OfpService],
  exports:[OfpService]
})
export class OfpModule {}
