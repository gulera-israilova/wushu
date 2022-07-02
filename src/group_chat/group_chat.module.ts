import { Module } from '@nestjs/common';
import { GroupChatService } from './group_chat.service';
import { GroupChatGateway } from './group_chat.gateway';

@Module({
  providers: [GroupChatGateway, GroupChatService]
})
export class GroupChatModule {}
