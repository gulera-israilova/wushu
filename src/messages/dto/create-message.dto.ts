import { MessageStatusEnum } from '../enums/message.status.enum';

export class CreateMessageDto {
  user: number;
  text: string;
  date: Date;
  edited: boolean;
  read: MessageStatusEnum;
  lobby: number;
  attachment?:string ;
  file?:Express.Multer.File
  fileType:string;
}
