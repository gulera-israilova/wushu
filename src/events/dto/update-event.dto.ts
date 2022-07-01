import {ApiProperty} from "@nestjs/swagger";

export class UpdateEventDto{

    @ApiProperty({
        example: 'title',
        description: 'Event title',
        required:false,
    })
    title: string;

    @ApiProperty({
        example: 'Bishkek',
        description: 'Event city',
        required:false,
    })
    city: string;

    @ApiProperty({
        example: '2022-01-01',
        description: 'Event date',
        required: false,
    })
    date: string;
}