import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DirectService } from './direct.service';
import { CreateDirectDto } from './dto/create-direct.dto';
import { Request } from '@nestjs/common';
import { UserGuard } from '../guards/user.guard';
import {ApiBearerAuth, ApiOperation, ApiTags} from "@nestjs/swagger";
@ApiTags('direct')
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('direct')
export class DirectController {
  constructor(private readonly directService: DirectService) {}
  @ApiOperation({summary:`Create direct`})
  @Post('create-direct')
  async create(@Body() createDirectDto: CreateDirectDto, @Request() req) {
    return this.directService.create(createDirectDto, req.user.id);
  }
  @ApiOperation({summary:`get all directs where user is partner or author`})
  @Get('get-my-directs')
  async findAll(@Request() req) {
    return this.directService.findAll(req.user.id);
  }
  @ApiOperation({summary:`delete direct with id`})
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.directService.remove(id);
  }
}
