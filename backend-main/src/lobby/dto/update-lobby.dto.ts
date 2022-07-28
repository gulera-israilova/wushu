import { PartialType } from '@nestjs/mapped-types';
import { CreateLobbyDto } from './create-lobby.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLobbyDto extends PartialType(CreateLobbyDto) {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  photo?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  users: number[];
}
