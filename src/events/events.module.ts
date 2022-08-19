import {forwardRef, Module} from '@nestjs/common';
import {EventsController} from './events.controller';
import {EventsService} from './events.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EventEntity} from "./entity/event.entity";
import {AuthModule} from "../auth/auth.module";
import {SubgroupsModule} from "../subgroups/subgroups.module";

@Module({
    imports: [TypeOrmModule.forFeature([EventEntity]),
        forwardRef(() => AuthModule),
        forwardRef(() => SubgroupsModule),
    ],
    controllers: [EventsController],
    providers: [EventsService],
    exports: [EventsService]
})
export class EventsModule {
}
