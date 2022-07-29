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
import { Request } from '@nestjs/common';
import { IsTypingDto } from './dto/is-typing.dto';
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
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.to(createMessageDto.lobby.toString()).emit('message', message);
  }
  @SubscribeMessage('join-to-lobby')
  async join(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    data['lobby_list'].forEach((e) => {
      client.join(e.toString());
    });
  }
  @SubscribeMessage('typing')
  async isTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: IsTypingDto,
  ) {
    console.log(data.userId,data.isTyping)
    console.log(data.lobbyId)
    // this.server.to(createMessageDto.lobby.toString()).emit('message', message);
    // this.server.to(data.lobbyId.toString()).emit('typing',{id:data.userId,typing:data.isTyping})
    client.broadcast
      .to(data.lobbyId.toString())
      .emit('typing', { id: data.userId, typing: data.isTyping });
    // client.broadcast.emit('typing', { name, isTyping });
  }
  @SubscribeMessage('updateMessage')
  async update(
    @MessageBody() updateMessageDto: UpdateMessageDto,
    @Request() req,
  ) {
    return await this.messagesService.update(
      updateMessageDto.id,
      updateMessageDto,
      req.user.id,
    );
  }
  @SubscribeMessage('removeMessage')
  async remove(@MessageBody() id: number, @Request() req) {
    await this.messagesService.remove(id, req.user.id);
  }
}
