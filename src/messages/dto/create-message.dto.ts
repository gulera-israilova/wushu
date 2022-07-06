import { MessageStatusEnum } from '../enums/message.status.enum';

export class CreateMessageDto {
  user: number;
  text: string;
  date: Date;
  edited: boolean;
  read: MessageStatusEnum;
  direct?: number;
  lobby?: number;
}
