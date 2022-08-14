import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enum/role.enum';
import { UserRole } from 'aws-sdk/clients/workmail';
import { IsEnum } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Elon Musk',
    description: 'Username',
    required: false,
  })
  name: string;

  @ApiProperty({
    example: 'trainer@gmail.com',
    description: 'User email',
    required: false,
  })
  email: string;
  @ApiProperty({
    example: 'trainer@gmail.com',
    description: 'User email',
    required: false,
  })
  city: string;
  @ApiProperty({
    example: 'trainer@gmail.com',
    description: 'User email',
    required: false,
  })
  country: string;
  @ApiProperty({
    example: 'trainer@gmail.com',
    description: 'User email',
    required: false,
  })
  phone: string;
  @ApiProperty({
    example: 'your photo from your device',
    description: 'photo',
    required: false,
  })
  photo: string;
  @ApiProperty()
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
