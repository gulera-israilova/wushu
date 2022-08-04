import {ApiProperty} from "@nestjs/swagger";
import {IsEnum} from "class-validator";
import {RankEnum} from "../enum/rank.enum";

export class UpdateAchievementDto{
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
    })
    subgroup:string;

    @ApiProperty({
        example: '1',
        description: 'Place in the championship',
    })
    place: number;

    @ApiProperty({
        example: '2022',
        description: 'Championship year',
    })
    year: number;

    @ApiProperty({
        example: '1',
        description: 'Sportsman id',
    })
    sportsman:number;
}