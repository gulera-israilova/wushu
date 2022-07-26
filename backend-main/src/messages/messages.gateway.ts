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
import {
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FileInterceptor('attachment'))
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @UploadedFile() attachment: Express.Multer.File,
    @ConnectedSocket() client: Socket,
  ) {
    const message = this.messagesService.create(
      createMessageDto,
      attachment,
    );
    this.server.emit('message', message);
    return message;
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
