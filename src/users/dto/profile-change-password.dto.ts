import { ApiProperty } from '@nestjs/swagger';

export class ProfileChangePasswordDto {
  @ApiProperty()
  password: string;
  @ApiProperty()
  new_password: string;
}
