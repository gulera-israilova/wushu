import { RoleEnum } from '../enum/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWithoutPasswordDto {
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
  country: string;
  @ApiProperty()
  city: string;
  status: number;
  tmp: string;
  @ApiProperty()
  link: string;
}
