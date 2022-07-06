import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './entities/message.entity';
import { UserRepo } from '../users/entity/user.entity';
import { MessageStatusEnum } from './enums/message.status.enum';

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
      text: createMessageDto.text,
      date: new Date(),
      edited: false,
      read: MessageStatusEnum.SENT,
      direct: createMessageDto.direct,
      lobby: createMessageDto.lobby,
    };
    return await this.repo.save(message);
  }

  async getClientName(userId: number): Promise<string> {
    const user = await this.userRepo.findOne(userId);
    if (!user) throw new BadRequestException(`Пользователь не найден`);
    return user.name;
  }
  async update(id: number, updateMessageDto: UpdateMessageDto, userId: number) {
    const message = await this.repo.findOne(id);
    const user = await this.userRepo.findOne(userId);
    if (!message)
      throw new BadRequestException(`Сообщение ${id} не было найдено`);
    if (message.user !== user.id)
      throw new BadRequestException(`Вам не разрешено изменять сообщение`);
    const newMessage: UpdateMessageDto = {
      id: updateMessageDto.id,
      text: updateMessageDto.text,
      edited: updateMessageDto.edited,
      read: updateMessageDto.read,
    };
    Object.assign(message, newMessage);
    return await this.repo.save(message);
  }

  async remove(id: number, userId: number) {
    const message = await this.repo.findOne(id);
    const user = await this.userRepo.findOne(userId);
    if (!user) throw new BadRequestException('Пользователь не найден');
    if (message.user !== user.id)
      throw new BadRequestException(`Вам не разрешено удалять это сообщение`);
    if (!message) throw new BadRequestException(`Сообщение не найдено`);
    await this.repo.delete(id);
  }
}
