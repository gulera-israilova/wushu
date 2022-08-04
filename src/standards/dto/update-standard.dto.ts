import {ApiProperty} from "@nestjs/swagger";

export class UpdateStandardDto {
    @ApiProperty({
        example: 'Run',
        description: 'Type of standard',
        required:true,
    })
    type: string;

    @ApiProperty({
        example: '7,5',
        description: "Standard grade",
    })
    grade: number;

    @ApiProperty({
        description: 'Note',
    })
    note: string;

    @ApiProperty({
        example: '2022',
        description: 'Year of passing standards',
    })
    year: number;
}