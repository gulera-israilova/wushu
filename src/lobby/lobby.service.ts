import { Injectable } from '@nestjs/common';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { LobbyRepo } from './entities/lobby.entity';

@Injectable()
export class LobbyService {
  constructor(private readonly repo: LobbyRepo) {}
  create(createLobbyDto: CreateLobbyDto) {
    return 'This action adds a new lobby';
  }

  findAll() {
    return `This action returns all lobby`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lobby`;
  }

  update(id: number, updateLobbyDto: UpdateLobbyDto) {
    return `This action updates a #${id} lobby`;
  }

  remove(id: number) {
    return `This action removes a #${id} lobby`;
  }
}
