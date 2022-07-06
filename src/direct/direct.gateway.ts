import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { DirectService } from './direct.service';
import { CreateDirectDto } from './dto/create-direct.dto';
import { Server } from 'socket.io';
import { Request, UseGuards } from '@nestjs/common';
import { UserGuard } from '../guards/user.guard';
import { ApiOperation } from '@nestjs/swagger';
@UseGuards(UserGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DirectGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly directService: DirectService) {}
  @SubscribeMessage('createDirect')
  async create(
    @MessageBody() createDirectDto: CreateDirectDto,
    @Request() req,
  ) {
    return await this.directService.create(createDirectDto, req.user.id);
  }
  @ApiOperation({
    summary: `finds direct chat where person can be as author or partner `,
  })
  @SubscribeMessage('findAllDirect')
  async findAll(@Request() req) {
    return await this.directService.findAll(req.user.id);
  }
  @ApiOperation({ summary: `Удаление директа ` })
  @SubscribeMessage('removeDirect')
  async remove(@MessageBody() id: number) {
    return await this.directService.remove(id);
  }
}
