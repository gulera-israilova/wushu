import { PartialType } from '@nestjs/mapped-types';
import { CreateLobbyDto } from './create-lobby.dto';
import {ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../../users/entity/user.entity";

export class UpdateLobbyDto extends PartialType(CreateLobbyDto) {
  id: number;
}
