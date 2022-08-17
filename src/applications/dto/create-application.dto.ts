import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty, IsEnum} from "class-validator";
import {GenderEnum} from "../enum/gender.enum";

export class CreateApplicationDto{
    @ApiProperty({
        example: 'Marlen Kalandarov',
        description: 'Sportsman name',
        required: true,
    })
    name: string;

    @ApiProperty({
        example: 'male',
        description: 'Sportsman gender: male/female',
        required:true,
    })
    @IsEnum(GenderEnum)
    gender: GenderEnum;

    @ApiProperty({
        example: '10',
        description: 'Sportsman age',
        required: true,
    })
    age: number;

    @ApiProperty({
        example: 'Frigate',
        description: 'Club name',
        required: false,
    })
    club: string;

    @ApiProperty({
        required: false,
    })
    quanShu: string;

    @ApiProperty({
        required: false,
    })
    cisse: string;

    @ApiProperty({
        required: false,
    })
    tai_chi_quan_shu: string;

    @ApiProperty({
        required: false,
    })
    tai_chi_quan_cisse: string;

    @ApiProperty({
        required: false,
    })
    duilian: string;

    @ApiProperty({
        required: false,
    })
    team_number: number;

    @ApiProperty({
        required: false,
    })
    comment: string;

    @IsEmpty()
    event: number;

    @IsEmpty()
    trainer:string;

    @IsEmpty()
    trainerId:number;

    @IsEmpty()
    createDate:string;
}