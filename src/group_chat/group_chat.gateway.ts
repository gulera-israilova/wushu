import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { GroupChatService } from './group_chat.service';
import { CreateGroupChatDto } from './dto/create-group_chat.dto';
import { UpdateGroupChatDto } from './dto/update-group_chat.dto';

@WebSocketGateway()
export class GroupChatGateway {
  constructor(private readonly groupChatService: GroupChatService) {}

  @SubscribeMessage('createGroupChat')
  create(@MessageBody() createGroupChatDto: CreateGroupChatDto) {
    return this.groupChatService.create(createGroupChatDto);
  }

  @SubscribeMessage('findAllGroupChat')
  findAll() {
    return this.groupChatService.findAll();
  }

  @SubscribeMessage('findOneGroupChat')
  findOne(@MessageBody() id: number) {
    return this.groupChatService.findOne(id);
  }

  @SubscribeMessage('updateGroupChat')
  update(@MessageBody() updateGroupChatDto: UpdateGroupChatDto) {
    return this.groupChatService.update(updateGroupChatDto.id, updateGroupChatDto);
  }

  @SubscribeMessage('removeGroupChat')
  remove(@MessageBody() id: number) {
    return this.groupChatService.remove(id);
  }
}
