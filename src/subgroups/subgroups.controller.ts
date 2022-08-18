import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {SubgroupsService} from "./subgroups.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SubgroupEntity} from "./entity/subgroup.entity";
import {
    ApproveProtocolDto,
    CreateGradeSportsman,
    CreateRefereeTeamDto,
    CreateSubgroupDto
} from "./dto/create-subgroup.dto";


@Controller('subgroups')
@ApiTags('protocols')
export class SubgroupsController {
    constructor( private subgroupsService: SubgroupsService){}

    @ApiOperation({summary: 'Form a protocol'})
    @ApiParam({name: 'id', description: 'Event identification number'})
    @ApiResponse({
        status: 201,
        description: 'Protocols formed',
        type:[SubgroupEntity]
    })
    @Get(':id')
    formProtocol(@Param('id') id: number){
        return this.subgroupsService.formProtocol(id);
    }

    @ApiOperation({summary: 'Get a protocol'})
    @ApiParam({name: 'id', description: 'Event identification number'})
    @ApiResponse({
        status: 201,
        description: 'Protocols list returned successfully',
        type:[SubgroupEntity]
    })
    @Get('/get-by-event/:id')
    get(@Param('id') id: number){
        return this.subgroupsService.get(id);
    }

    @ApiOperation({summary: 'Get a subgroup'})
    @ApiParam({name: 'id', description: 'Subgroup identification number'})
    @ApiResponse({
        status: 201,
        description: 'Protocols formed',
        type:SubgroupEntity
    })
    @Get('/get-by-subgroup/:id')
    getSubgroup(@Param('id') id: number){
        return this.subgroupsService.getSubgroup(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update subgroup'})
    @ApiParam({name: 'id', description: 'Subgroup identification number' })
    @ApiBody({type: CreateSubgroupDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated club will be returned',
        type: [SubgroupEntity],
    })
    async update(@Param('id') id: number, @Body() createSubgroupDto: CreateSubgroupDto) {
        return await this.subgroupsService.update(id, createSubgroupDto);
    }

    @Patch('/approve/:id')
    @ApiOperation({summary: 'Approve a protocol'})
    @ApiParam({name: 'id', description: 'Event identification number' })
    @ApiBody({type: ApproveProtocolDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated club will be returned',
        type: [SubgroupEntity],
    })
    async approve(@Param('id') id: number, @Body() approveProtocolDto: ApproveProtocolDto) {
        return await this.subgroupsService.approve(id, approveProtocolDto);
    }

    @Patch('/referee/:id')
    @ApiOperation({summary: 'Appoint a referee'})
    @ApiParam({name: 'id', description: 'Subgroup identification number' })
    @ApiBody({type: CreateRefereeTeamDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated club will be returned',
        type: [SubgroupEntity],
    })
    async createRefereeTeam(@Param('id') id: number, @Body() createRefereeTeamDto: CreateRefereeTeamDto) {
        return await this.subgroupsService.createRefereeTeam(id, createRefereeTeamDto);
    }

    @Patch('/refereeGrade/:id')
    @ApiOperation({summary: 'Referee grade'})
    @ApiParam({name: 'id', description: 'Subgroup identification number' })
    @ApiBody({type: CreateGradeSportsman})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated club will be returned',
        type: [SubgroupEntity],
    })
    async createGradeSportsman(@Param('id') id: number, @Body() createGradeSportsman: CreateGradeSportsman) {
        return await this.subgroupsService.createGradeSportsman(id, createGradeSportsman);
    }


}
