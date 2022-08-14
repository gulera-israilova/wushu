import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { UserGuard } from '../guards/user.guard';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
@ApiTags('Lobby')
@UseGuards(UserGuard)
@ApiBearerAuth()
@Controller('lobby')
export class LobbyController {
  constructor(private readonly lobbyService: LobbyService) {}

  @ApiOperation({
    summary: `Should provide a list of users or user to create lobby`,
  })
  @Post('create-lobby')
  async create(@Body() createLobbyDto: CreateLobbyDto, @Request() req) {
    return this.lobbyService.create(createLobbyDto, req.user.id);
  }
  @ApiOperation({
    summary: `add user from link`,
  })
  @Patch('add-user')
  async add_user(@Body() lobbyId: number, @Body() UserId: number[]) {
    return await this.lobbyService.addUser(lobbyId, UserId);
  }
  @ApiOperation({ summary: `A list of group chats` })
  @Get('get-my-groups')
  async findAll(@Request() req) {
    return this.lobbyService.findAll(req.user.id);
  }
  @ApiOperation({summary:'get messages from lobby by id'})
  @Get('message-lobby/:id')
  async getMessages(@Param('id')id:number){
    return await this.lobbyService.getMessages(id)
  }

  @ApiOperation({ summary: `Change members of group` })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLobbyDto: UpdateLobbyDto,
  ) {
    return this.lobbyService.update(id, updateLobbyDto);
  }

  @ApiOperation({
    summary: `Leave the group.If the last user,deletes`,
  })
  @Delete('leave-lobby/:lobbyId')
  async leave(@Param('lobbyId') lobbyId: number, @Request() req) {
    return await this.lobbyService.leaveLobby(lobbyId, req.user.id);
  }

  @ApiOperation({ summary: `Delete group` })
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.lobbyService.remove(id);
  }
}
