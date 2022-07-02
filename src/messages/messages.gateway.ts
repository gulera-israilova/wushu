import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server, Socket } from 'socket.io';
import { Request, UseGuards } from '@nestjs/common';
import { UserGuard } from '../guards/user.guard';
@UseGuards(UserGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
    @Request() req,
  ) {
    const message = this.messagesService.create(createMessageDto, req.user.id);
    this.server.emit('message', message);
    return message;
  }
  @SubscribeMessage('join')
  async joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    return await this.messagesService.identify(name, client.id);
  }
  @SubscribeMessage('typing')
  async isTyping(
    @MessageBody('isTyping') isTyping: boolean,
    @Request() req,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messagesService.getClientName(req.user.id);
    client.broadcast.emit('typing', { name, isTyping });
  }

  @SubscribeMessage('findAllMessages')
  async findAll() {
    return await this.messagesService.findAll();
  }
  @SubscribeMessage('updateMessage')
  async update(@MessageBody() updateMessageDto: UpdateMessageDto) {
    return await this.messagesService.update(
      updateMessageDto.id,
      updateMessageDto,
    );
  }
  @SubscribeMessage('removeMessage')
  async remove(@MessageBody() id: number) {
    return await this.messagesService.remove(id);
  }
}
