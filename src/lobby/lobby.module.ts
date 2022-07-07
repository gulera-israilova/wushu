import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyGateway } from './lobby.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LobbyRepo } from './entities/lobby.entity';
import { UserLobbyRepo } from './entities/user_lobby.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([LobbyRepo, UserLobbyRepo]), AuthModule],
  providers: [LobbyGateway, LobbyService],
})
export class LobbyModule {}
