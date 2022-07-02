import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupChatDto } from './create-group_chat.dto';

export class UpdateGroupChatDto extends PartialType(CreateGroupChatDto) {
  id: number;
}
