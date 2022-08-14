import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { LobbyRepo } from './entities/lobby.entity';
import { UserLobbyRepo } from './entities/user_lobby.entity';

@Injectable()
export class LobbyService {
  constructor(
    private readonly repo: LobbyRepo,
    private readonly user_lobby_repo: UserLobbyRepo,
  ) {}
  async create(createLobbyDto: CreateLobbyDto) {}//доделать

  async findAll(userId: number) {
    const group_chat = await this.repo.find({
      where: { authorId: userId, user_lobby: userId },
      relations: ['letters'], //может не работать т.к. user_lobby это не айди пользователя
    });
    if (!group_chat) throw new BadRequestException(`Группы с вами не найдены`);
    return group_chat;
  }

  async update(id: number, updateLobbyDto: UpdateLobbyDto) {
    return `This action updates a #${id} lobby`; //доделать
  }

  async remove(id: number) {
    const lobby = await this.user_lobby_repo.findOne(id);
    if (!lobby) throw new BadRequestException();
    return await this.user_lobby_repo.delete(id);
  }
}
