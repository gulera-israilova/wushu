import { ApiProperty } from '@nestjs/swagger';

export class CreateLobbyDto {
  authorId: number;
  @ApiProperty({ example: 'Top Team' })
  name?: string;
  // @ApiProperty({
  //   example: 'https://hvat.ru/wp-content/uploads/2013/04/forma.jpg',
  // })
  // photo?: string;
  @ApiProperty({ example: 'ляллялял' })
  description?: string;
  @ApiProperty()
  created_date: Date;
  @ApiProperty({ example: `true` })
  direct: boolean;
  @ApiProperty({ example: [1, 2] })
  users: number[];
}
