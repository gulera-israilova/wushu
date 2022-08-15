import {ApiProperty} from "@nestjs/swagger";
import {ArenaEnum} from "../enum/arena.enum";
import {IsArray, IsEnum, ValidateNested} from "class-validator";
import {SportsmanSDto, SportsmanSubgroupsDto} from "../../sportsmen-subgroups/dto/sportsman-subgroups.dto";
import {Type} from "class-transformer";
import {StatusEnum} from "../enum/status.enum";


export class CreateSubgroupDto {

    @ApiProperty({
        example:'Subgroup 1',
        description:'The name of the subgroup',
    })
    name: string;

    @ApiProperty({
        example:'Girls (10-12 age)',
        description:'Subgroup description',
    })
    description: string;

    @ApiProperty({
        example: 'north',
        description: 'Arena: north/south',
    })
    @IsEnum(ArenaEnum)
    arena: ArenaEnum;

    @ApiProperty()
    start_time: Date;

    @ApiProperty()
    event:number;

    @ApiProperty({type: [SportsmanSubgroupsDto],required:true})
    @ValidateNested({ each: true })
    @Type(() => SportsmanSubgroupsDto)
    applications: SportsmanSubgroupsDto[]

    @ApiProperty({
        example: 'approved',
        description: 'Arena: approved/not_approved/pending',
    })
    @IsEnum(StatusEnum)
    status: StatusEnum;
}


export class CreateSDto {

    @ApiProperty({
        example:'Subgroup 1',
        description:'The name of the subgroup',
    })
    name: string;

    @ApiProperty({
        example:'Girls (10-12 age)',
        description:'Subgroup description',
    })
    description: string;

    @ApiProperty({
        example: 'north',
        description: 'Arena: north/south',
    })
    @IsEnum(ArenaEnum)
    arena: ArenaEnum;

    @ApiProperty()
    start_time: Date;

    @ApiProperty()
    event:number;

    @ApiProperty({type: [SportsmanSDto],required:true})
    @ValidateNested({ each: true })
    @Type(() => SportsmanSDto)
    applications: SportsmanSDto[]
}