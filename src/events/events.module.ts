import {forwardRef, Module} from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventEntity} from "./entity/event.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity]),
    forwardRef(() => AuthModule)],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
