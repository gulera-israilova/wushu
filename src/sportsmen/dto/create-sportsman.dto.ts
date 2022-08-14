import {ApiProperty} from "@nestjs/swagger";
import {GenderEnum} from "../enum/gender.enum";
import {IsArray, IsEmpty, ValidateNested} from "class-validator";
import {Type} from "class-transformer";


export class CreateSportsmanDto{

    @ApiProperty({
        example: 'Elon Musk',
        description: 'Username',
        required: true,
    })
    name: string;

    // @ApiProperty({ example: 'male', description: 'Gender: male/female', required: true })
    // gender: GenderEnum

    @ApiProperty({
        example: 'male',
        description: 'male/female',
        required: true,
    })
    gender: string;

    @ApiProperty({
        example: '12',
        description: 'Athlete\'s age',
        required: true,
    })
    age: number;

    @ApiProperty({
        example:"https://wushubook.s3.amazonaws.com/reference/pampass.jpg",
        description:'Link to health certificate: jpg/jpeg/png/svg/bmp/doc/docs/pdf/txt/cdr/djvu/psd/csv',
        required: false,
        format: 'binary',
        type: 'string',
    })
    reference: string;

    @IsEmpty()
    referenceKey:string;

    @ApiProperty({
        example: 'Master',
        description: 'Rank' ,
        required: true,
    })
    rank: string;

    @ApiProperty({
        required: false,
    })
    dzi: number;

    @ApiProperty({
        required: false,
    })
    duan: number;

    @ApiProperty({
        description: 'Club ID',
        required: true,
    })
    club: number;

    @IsEmpty()
    ofp:number
}
