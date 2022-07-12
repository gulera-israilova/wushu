import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty} from "class-validator";

export class CreateEventDto{

    @ApiProperty({
        example: 'Title',
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