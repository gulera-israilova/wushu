import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { MessageStatusEnum } from '../enums/message.status.enum';
import { IsEnum } from 'class-validator';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  id: number;
  text: string;
  @IsEnum(MessageStatusEnum)
  read: MessageStatusEnum;
  edited: boolean;
}
