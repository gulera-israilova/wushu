import {Body, Controller, Get, Param, Post, UseGuards} from "@nestjs/common";
import {LobbyService} from "./lobby.service";
import {CreateLobbyDto} from "./dto/create-lobby.dto";
import {Request} from '@nestjs/common'
import {UserGuard} from "../guards/user.guard";
import {ApiBearerAuth, ApiParam, ApiProperty, ApiTags} from "@nestjs/swagger";

@ApiTags('Lobby')
@Controller()
export class LobbyController {
    constructor(private service: LobbyService) {}

//создать лобби получить лобби
    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Post('create-Lobby')
    async createLobby(@Body() dto: CreateLobbyDto, @Request() req) {
        return await this.service.create(dto, req.user.id)
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get('get-my-groups')
    async getMyLobby(@Request() req) {
        return await this.service.findAll(req.user.id)
    }

    @ApiBearerAuth()
    @UseGuards(UserGuard)
    @Get('get-messages')
    @ApiParam({ name:'lobbyId', description: '1' })
    async getMyMessage(@Param() lobbyId: number) {
        return await this.service.getMessages(lobbyId)
    }
}