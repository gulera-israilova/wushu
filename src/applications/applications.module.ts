import {forwardRef, Module} from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ApplicationEntity} from "./entity/application.entity";
import {AuthModule} from "../auth/auth.module";
import {EventsModule} from "../events/events.module";

@Module({
  imports:[TypeOrmModule.forFeature([ApplicationEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => EventsModule),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
