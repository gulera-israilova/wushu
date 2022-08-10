import {ApiProperty} from "@nestjs/swagger";
import {IsDate} from "class-validator";
import {Type} from "class-transformer";

export class AddEventToCalendarDto{

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
        example: '2022-01-01T10:30',
        description: 'Event start date',
        required: true,
    })
    @IsDate()
    @Type(() => Date)
    start: Date;

    @ApiProperty({
        example: '2022-01-03T14:30',
        description: 'End date of the event',
        required: false,
    })
    @IsDate()
    @Type(() => Date)
    end: Date;

    @ApiProperty({
        required:false,
    })
    display: string;

    @ApiProperty({
        required:false,
    })
    color: string;

    @ApiProperty({
        example:"false",
        required:false,
    })
    allDay: boolean;

    @ApiProperty({
        required:false,
    })
    textColor: string;
}