import { Injectable } from '@nestjs/common';
import { CreateGroupChatDto } from './dto/create-group_chat.dto';
import { UpdateGroupChatDto } from './dto/update-group_chat.dto';

@Injectable()
export class GroupChatService {
  create(createGroupChatDto: CreateGroupChatDto) {
    return 'This action adds a new groupChat';
  }

  findAll() {
    return `This action returns all groupChat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupChat`;
  }

  update(id: number, updateGroupChatDto: UpdateGroupChatDto) {
    return `This action updates a #${id} groupChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupChat`;
  }
}
