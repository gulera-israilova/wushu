import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';//сохранить в
  }


  async getMyNotifications(id:number){
  //  const user = await this.userRepo.findOne(id)
  //  if(!user)throw new NotFoundException()
    //const response = //передать все уведомления связанные с его айди
    //очищает связь в бд с этим человеком уведомление
    // return response
  }
}
