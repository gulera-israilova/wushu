import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './entities/message.entity';
import { UserRepo } from '../users/entity/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    private readonly repo: MessageRepository,
    private readonly userRepo: UserRepo,
  ) {}
  async create(createMessageDto: CreateMessageDto, userId: number) {
    const user = await this.userRepo.findOne(userId);
    if (!user) throw new BadRequestException(`Пользователь не был найден`);
    const message: CreateMessageDto = {
      user: user.id,
      message: createMessageDto.message,
      date: new Date(),
      edited: false,
    };
    return await this.repo.save(message);
  }
  async findAll() {
    return await this.repo.find();
  }
  async identify(name: string, clientId: string) {
    const user = await this.userRepo.findOne(clientId);
    if (!user)
      throw new BadRequestException(
        `Пользователь с айди ${clientId} не найден `,
      );
    return user;
  }
  async getClientName(userId: number): Promise<string> {
    const user = await this.userRepo.findOne(userId);
    if (!user) throw new BadRequestException(`Пользователь не найден`);
    return user.name;
  }
  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.repo.findOne(id);
    if (!message)
      throw new BadRequestException(`Сообщение ${id} не было найдено`);
    const newMessage: UpdateMessageDto = {
      id:updateMessageDto.id,
      message: updateMessageDto.message,
      edited: true,
    };
    Object.assign(message, newMessage);
    return await this.repo.save(message);
  }

  async remove(id: number) {
    const message = await this.repo.findOne(id);
    if (!message) throw new BadRequestException(`Сообщение не найдено`);
    return message;
    // await this.repo.remove(id, { cascade: true });
  }
}
