import {ApiProperty} from "@nestjs/swagger";

export class CreateEventDto{

    @ApiProperty({
        example: 'title',
        description: 'Event title',
        required:true,
    })
    title: string;

    @ApiProperty({
        example: 'Bishkek',
        description: 'Event city',
        required:true,
    })
    city: string;

    @ApiProperty({
        example: '2022-01-01',
        description: 'Event date',
        required: true,
    })
    date: string;
}