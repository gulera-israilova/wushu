import { ApiProperty } from '@nestjs/swagger';

export class CreateLobbyDto {
    @ApiProperty()
    authorId: number;
    @ApiProperty()
    users: [number] | number;
}
