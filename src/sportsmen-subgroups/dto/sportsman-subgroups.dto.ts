import {ApiProperty} from "@nestjs/swagger";
import {CreateRefereeDto} from "../../subgroups/dto/create-referee.dto";
import {ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class SportsmanSubgroupsDto {
    @ApiProperty()
    application: number

    @ApiProperty()
    subgroup:number

    @ApiProperty()
    taolu:string

    @ApiProperty()
    area:number
}

export class SportsmanGrade {
    @ApiProperty()
    application: number
    @ApiProperty()
    subgroup:number
    @ApiProperty({type: [CreateRefereeDto],required:false})
    @ValidateNested({ each: true })
    @Type(() => CreateRefereeDto)
    referee_team: CreateRefereeDto[]
    @ApiProperty()
    final_score:number
    @ApiProperty()
    place:number
    @ApiProperty()
    formula_score:number


}
export class SportsmanSDto {
    @ApiProperty()
    application: number
    @ApiProperty()
    taolu:string
    @ApiProperty()
    final_score:number
    @ApiProperty()
    place:number
    @ApiProperty()
    formula_score:number
    @ApiProperty()
    area:number
}
