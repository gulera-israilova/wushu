import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyController } from './lobby.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LobbyRepo} from "./entities/lobby.entity";
import {AuthModule} from "../auth/auth.module";
import {UserLobbyRepo} from "./entities/user_lobby.entity";
import {UsersModule} from "../users/users.module";

@Module({
  imports:[TypeOrmModule.forFeature([LobbyRepo,UserLobbyRepo]),AuthModule,UsersModule],
  controllers: [LobbyController],
  providers: [LobbyService]
})
export class LobbyModule {}
