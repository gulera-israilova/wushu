import {ApiProperty} from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import {GenderEnum} from "../../applications/enum/gender.enum";
import {RankEnum} from "../enum/rank.enum";

export class CreateAchievementDto{

    @ApiProperty({
        example: 'World Championship',
        description: 'Name of the championship',
        required:true,
    })

    championship: string;

    @ApiProperty({
        example: 'A',
        description: 'Championship Rank: A/B/C/D/E',
        required:true,
    })
    @IsEnum(RankEnum)
    rank: RankEnum;

    @ApiProperty({
        description: "Subgroup",
        required:true,
    })
    subgroup:string;

    @ApiProperty({
        description: "Category",
        required:true,
    })
    category:string;

    @ApiProperty({
        example: '1',
        description: 'Place in the championship',
        required:false,
    })
    place: number;

    @ApiProperty({
        example: '2022',
        description: 'Championship year',
        required:true,
    })
    year: number;

    @ApiProperty({
        example: '1',
        description: 'Sportsman id',
        required:true,
    })
    sportsman:number;

    grade:number
}