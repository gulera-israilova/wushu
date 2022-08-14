import {forwardRef, Module} from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CalendarEntity} from "./entity/calendar.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEntity]),
    forwardRef(() => AuthModule)],
  controllers: [CalendarController],
  providers: [CalendarService]
})
export class CalendarModule {}
