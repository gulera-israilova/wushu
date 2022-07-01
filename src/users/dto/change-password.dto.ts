import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  tmp: string;
  @ApiProperty()
  password: string;
}
