import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsString} from "class-validator";


export class CreateClubDto{
    @ApiProperty({
        description:'The name of the club',
        required:true,
    })
    @IsString({ message:'Must be a string value' })
    name: string;

    @ApiProperty({
        type: 'array',
        items: {
            type: 'number',
        },
    })
    @IsArray()
    trainers: number[];


    @ApiProperty({
        required:false,
    })
    @IsString({ message:'Must be a string value' })
    options: string;

}