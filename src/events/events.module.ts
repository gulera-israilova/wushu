import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NewsEntity} from "../news/entity/news.entity";
import {EventEntity} from "./entity/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService]
})
export class EventsModule {}
