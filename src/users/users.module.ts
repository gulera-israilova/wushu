import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "./entity/user.entity";
import {ClubsModule} from "../clubs/clubs.module";

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity]),
    forwardRef(()=>ClubsModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]

})
export class UsersModule {}
