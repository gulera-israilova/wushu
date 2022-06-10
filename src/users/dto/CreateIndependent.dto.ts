import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enum/role.enum';
import { IsEmpty } from 'class-validator';

export class CreateIndependentDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  appointment_date: string;
  @ApiProperty()
  rank: string;
  @ApiProperty()
  category: string;
  @ApiProperty()
  experience: number;
  @ApiProperty()
  role: RoleEnum;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  status: number;
}
