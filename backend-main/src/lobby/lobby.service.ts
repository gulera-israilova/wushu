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
import { MessageRepository } from '../messages/entities/message.entity';
import { description } from 'aws-sdk/clients/frauddetector';
import { In } from 'typeorm';

@Injectable()
export class LobbyService {
  constructor(
    private readonly repo: LobbyRepo,
    private readonly user_lobby_repo: UserLobbyRepo,
    private readonly messages_repo: MessageRepository,
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
  async update(id: number, updateLobbyDto: UpdateLobbyDto) {
    return `This action updates a #${id} lobby`;
  }

  async findAll(userId: number) {
    const lobby = await this.user_lobby_repo.find({
      where: { userId: userId },
    });
    const response = await Promise.all(
      lobby.map(async (e) => {
        const info = await this.repo.findOne(e.lobbyId);
        const res = {};
        if (info.direct === true) {
          res['lobby_id'] = e.lobbyId;
          res['direct'] = info.direct;
          res['users_id'] = await this.usersInLobby(e.lobbyId);
          res['last_message'] = await this.findLastMessages(e.lobbyId);
          return res;
        } else {
          res['lobby_info'] = await this.makeJsonUser(
            e.lobbyId,
            info.name,
            info.photo,
            info.description,
          );
          res['last_message'] = await this.findLastMessages(e.lobbyId);
          res['direct'] = info.direct;
          return res;
        }
      }),
    );
    return response;
  }
  async getMessages(lobbyId: number) {
    const lobby = await this.repo.findOne(lobbyId);
    if (!lobby) throw new NotFoundException();
    const messages = await this.messages_repo
      .createQueryBuilder('message')
      .where({ lobby: lobbyId })
      .select(['message', 'user.id', 'user.name', 'user.photo'])
      .leftJoin('message.user', 'user')
      .getMany();
    return messages;
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
  private async usersInLobby(id: number) {
    const users_in_lobby = await this.user_lobby_repo.find({
      where: { lobbyId: id },
    });
    const user_ids = await Promise.all(
      users_in_lobby.map(
        async (e) => await this.userService.findById({ id: e.userId }),
      ),
    );
    return user_ids;
  }
  private async makeJsonUser(
    lobby_id: number,
    lobby_name: string,
    lobby_photo: string,
    lobby_description: string,
  ) {
    const response = {};
    response['lobby_id'] = lobby_id;
    (response['lobby_name'] = lobby_name),
      (response['lobby_description'] = lobby_description),
      (response['lobby_photo'] = lobby_photo);
    return response;
  }
  private async findLastMessages(lobbyId: number) {
    const lobby = await this.repo.findOne(lobbyId);
    if (!lobby) throw new NotFoundException();
    const lastMessage = await this.repo.query(`
    select text,date from public.message where lobby_id =${lobbyId} ORDER BY id DESC LIMIT 1
    `);
    if (lastMessage.length !== 0) {
      return lastMessage.pop();
    } else {
      return {
        text: '',
      };
    }
  }
}
