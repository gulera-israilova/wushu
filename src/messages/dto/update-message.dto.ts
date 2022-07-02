import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  id: number;
  @ApiProperty()
  message: string;
  edited: boolean;
}
