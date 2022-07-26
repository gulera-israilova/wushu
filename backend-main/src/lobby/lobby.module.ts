import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyController } from './lobby.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LobbyRepo} from "./entities/lobby.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports:[TypeOrmModule.forFeature([LobbyRepo]),AuthModule],
  controllers: [LobbyController],
  providers: [LobbyService]
})
export class LobbyModule {}
