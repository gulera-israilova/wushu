import {forwardRef, Module} from '@nestjs/common';
import { StandardsController } from './standards.controller';
import { StandardsService } from './standards.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SportsmenModule} from "../sportsmen/sportsmen.module";
import {StandardEntity} from "./entity/standard.entity";
import {OfpModule} from "../ofp/ofp.module";

@Module({
  imports: [TypeOrmModule.forFeature([StandardEntity]),
    forwardRef(()=>SportsmenModule),
    forwardRef(() => OfpModule)],
  controllers: [StandardsController],
  providers: [StandardsService],
  exports:[StandardsService]
})
export class StandardsModule {}
