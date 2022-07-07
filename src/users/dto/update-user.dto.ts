import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enum/role.enum';

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
}
