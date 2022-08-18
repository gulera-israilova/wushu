import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LobbyRepo} from "./entities/lobby.entity";
import {AuthModule} from "../auth/auth.module";
import {UserLobbyRepo} from "./entities/user_lobby.entity";
import {UsersModule} from "../users/users.module";
import {MessageRepository} from "../messages/entities/message.entity";
import {LobbyController} from "./lobby.controller";

@Module({
  imports:[TypeOrmModule.forFeature([LobbyRepo,UserLobbyRepo,MessageRepository]),AuthModule,UsersModule],
  controllers: [LobbyController],
  providers: [LobbyService]
})
export class LobbyModule {}
