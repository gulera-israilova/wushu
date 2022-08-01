import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty, IsEnum} from "class-validator";
import {GenderEnum} from "../enum/gender.enum";
import {LevelEnum} from "../enum/level.enum";

export  class UpdateApplicationDto {
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
        example: '1',
        description: 'Club id',
        required: false,
    })
    club: number;

    @ApiProperty({
        required: true,
    })
    quan_shu: string;

    @ApiProperty({
        required: true,
    })
    cisse: string;

    @ApiProperty({
        required: true,
    })
    tai_chi_quan_shu: string;

    @ApiProperty({
        required: true,
    })
    tai_chi_quan_cisse: string;

    @ApiProperty({
        required: true,
    })
    duilian: string;

    @ApiProperty({
        required: true,
    })
    team_number: number;

    @ApiProperty({
        required: false,
    })
    comment: string;

    @ApiProperty({
        example: 1,
        required: true,
    })
    event: number;

    @ApiProperty({
        example: 1,
        required: false,
    })
    performance_duration: number;

    @ApiProperty({
        example: 'high',
        description: 'Level: low/average/high',
        required:false,
    })
    @IsEnum(LevelEnum)
    level: LevelEnum;

}