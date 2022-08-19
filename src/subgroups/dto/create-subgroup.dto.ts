import {ApiProperty} from "@nestjs/swagger";
import {ArenaEnum} from "../enum/arena.enum";
import {IsArray, IsEnum, ValidateNested} from "class-validator";
import {
    SportsmanGrade,
    SportsmanSDto,
    SportsmanSubgroupsDto
} from "../../sportsmen-subgroups/dto/sportsman-subgroups.dto";
import {Type} from "class-transformer";
import {StatusEnum} from "../enum/status.enum";
import {CreateRefereeDto} from "./create-referee.dto";


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

    @ApiProperty({
        required:false
    })
    area:number;

}
 export class CreateRefereeTeamDto {
     @ApiProperty({type: [CreateRefereeDto],required:false})
     @ValidateNested({ each: true })
     @Type(() => CreateRefereeDto)
     referee_team: CreateRefereeDto[]
 }
 export class CreateGradeSportsman{
     @ApiProperty({type: [SportsmanGrade],required:true})
     @ValidateNested({ each: true })
     @Type(() => SportsmanGrade)
     applications: SportsmanGrade[]
 }
 export class ApproveProtocolDto{
     @ApiProperty({
         example: 'approved',
         description: 'Arena: approved/not_approved/pending',
     })
     @IsEnum(StatusEnum)
     status: StatusEnum;

     @ApiProperty(
         {required:false}
     )
     reason_for_rejection: string;

 }

