import {WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket} from '@nestjs/websockets';
import {NotificationsService} from './notifications.service';
import {CreateNotificationDto} from './dto/create-notification.dto';
import {UpdateNotificationDto} from './dto/update-notification.dto';
import {Controller, Get, UseGuards,Request} from "@nestjs/common";
import {UserGuard} from "../guards/user.guard";
import {Server, Socket} from "socket.io";

@WebSocketGateway({
    cors:{
        origin:'*',
    }
})
export class NotificationsGateway {
    constructor(private readonly notificationsService: NotificationsService) {}
    @WebSocketServer()
    server:Server;
    @SubscribeMessage('createNotification')
    create(@ConnectedSocket()client:Socket,@MessageBody()users:number[]) {
      //  const notifications= this.notificationsService.create();
      //  this.server.to(users.map((e)=>e.toString())).emit('notifications',notifications)
    }


}

@Controller('Notific')//в сторону пользователя засунуть
export class Notific {
    constructor(private service: NotificationsService) {
    }
    @UseGuards(UserGuard)
    @Get('Get-my-Notifications')
    async get(@Request() req) {
        return await this.service.getMyNotifications(req.user.id)
    }
}