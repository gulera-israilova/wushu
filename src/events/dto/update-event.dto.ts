import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty} from "class-validator";

export class UpdateEventDto{

    @ApiProperty({
        example: 'Title',
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
        required: true,
    })
    start: string;

    @ApiProperty({
        example: '2022-01-01',
        description: 'Event date',
        required: true,
    })
    end: string;

    @ApiProperty({
        example: '9:00-12:00',
        description: 'Event time',
        required: true,
    })
    time: string;

    @ApiProperty({
        example: 'Seytek',
        description: 'Event address',
        required: true,
    })
    address: string;

    @IsEmpty()
    day: number;

    @IsEmpty()
    month:string;
}