import {ApplicationEntity} from "../../applications/entity/application.entity";
import {ApiProperty} from "@nestjs/swagger";
import {SubgroupEntity} from "../../subgroups/entity/subgroup.entity";

export class SportsmanSubgroupsDto {
    @ApiProperty()
    application: number
    @ApiProperty()
    subgroup:number
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
