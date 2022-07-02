import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  user: number;
  @ApiProperty()
  message: string;
  date: Date;
  edited: boolean;
}
