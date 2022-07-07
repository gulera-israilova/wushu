import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { Request,UseGuards } from '@nestjs/common';
import { UserGuard } from '../guards/user.guard';
@UseGuards(UserGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class LobbyGateway {
  constructor(private readonly lobbyService: LobbyService) {}

  @SubscribeMessage('createLobby')
  async create(@MessageBody() createLobbyDto: CreateLobbyDto) {
    return await this.lobbyService.create(createLobbyDto);
  }

  @SubscribeMessage('findAllLobby')
  async findAll(@Request() req) {
    return await this.lobbyService.findAll(req.user.id);
  }

  @SubscribeMessage('updateLobby')
  async update(@MessageBody() updateLobbyDto: UpdateLobbyDto) {
    return await this.lobbyService.update(updateLobbyDto.id, updateLobbyDto);
  }

  @SubscribeMessage('removeLobby')
  async remove(@MessageBody() id: number) {
    return await this.lobbyService.remove(id);
  }
}
