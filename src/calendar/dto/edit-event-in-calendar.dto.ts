import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty} from "class-validator";

export class EditEventInCalendarDto {

    @ApiProperty({
        example: 'Title',
        description: 'Event title',
        required:true,
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
        description: 'Event start date',
        required: true,
    })
    start: string;

    @ApiProperty({
        example: '2022-01-03',
        description: 'End date of the event',
        required: false,
    })
    end: string;

    @ApiProperty({
        example: '9:00-12:00',
        description: 'Event time',
        required: true,
    })
    time: string;

    @ApiProperty({
        required:false,
    })
    display: string;

    @ApiProperty({
        required:false,
    })
    color: string;
}