import {ApiProperty} from "@nestjs/swagger";

export class CreateDirectDto {
    authorId: number;
    @ApiProperty()
    partnerId: number;
    created_date: Date;
}
