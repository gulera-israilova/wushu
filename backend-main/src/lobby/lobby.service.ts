import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { Lobby, LobbyRepo } from './entities/lobby.entity';
import { UserLobbyRepo } from './entities/user_lobby.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class LobbyService {
  constructor(
    private readonly repo: LobbyRepo,
    private readonly user_lobby_repo: UserLobbyRepo,
    private userService: UsersService,
  ) {}
  async create(createLobbyDto: CreateLobbyDto, userId: number) {
    const users = await Promise.all(
      createLobbyDto.users.map(async (e) => {
        const isRegistered = await this.userService.isRegistered(e);
        if (!isRegistered) throw new ForbiddenException();
        return e;
      }),
    );
    createLobbyDto.users = users;
    createLobbyDto.authorId = userId;
    createLobbyDto.users.push(createLobbyDto.authorId);
    const lobby = await this.repo.save(createLobbyDto);
    await Promise.all(
      users.map(async (e) => {
        const saving = await this.user_lobby_repo.save({
          lobbyId: lobby.id,
          userId: e,
        });
        return saving;
      }),
    );
    return lobby;
  }
  async addUser(lobbyId: number, id: number[]) {
    console.log(id, lobbyId);
  }
  async findAll(userId: number) {
    const lobby = await this.user_lobby_repo.find({
      where: { userId: userId },
    });
    const response = await Promise.all(
      lobby.map(async (e) => {
        const info = await this.repo.findOne(e.lobbyId);
        const res = {};
        res['lobby_id'] = e.lobbyId;
        (res['lobby_name'] = info.name),
          (res['lobby_photo'] = info.photo),
          (res['last_message'] = 'should be last message here');
        return res;
      }),
    );
    return response;
  }

  async update(id: number, updateLobbyDto: UpdateLobbyDto) {
    return `This action updates a #${id} lobby`;
  }

  async leaveLobby(lobbyId: number, userId: number) {
    const user_lobby = await this.user_lobby_repo.findOne({
      userId: userId,
      lobbyId: lobbyId,
    });
    if (!user_lobby) throw new BadRequestException();
    const lastUser = await this.isLastMember(lobbyId);
    if (lastUser) await this.remove(lobbyId);
    await this.user_lobby_repo.delete(user_lobby.id);
    return await this.repo.delete(lobbyId);
  }

  async remove(id: number) {
    const lobby = await this.repo.findOne(id);
    await this.user_lobby_repo.delete({ lobbyId: id });
    //add function to delete all messages in this lobby
    if (!lobby) throw new NotFoundException();
    await this.repo.delete(id);
  }
  private async isLastMember(id: number) {
    const lobby = await this.repo.findOne(id, { relations: ['user_lobby'] });
    return lobby.user_lobby.length === 1;
  }
}
