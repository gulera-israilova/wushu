import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {SubgroupsService} from "./subgroups.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StandardEntity} from "../standards/entity/standard.entity";
import {SubgroupEntity} from "./entity/subgroup.entity";
import {CreateSubgroupDto} from "./dto/create-subgroup.dto";
import {UpdateEventDto} from "../events/dto/update-event.dto";
import {EventEntity} from "../events/entity/event.entity";


@Controller('subgroups')
@ApiTags('protocols')
export class SubgroupsController {
    constructor( private subgroupsService: SubgroupsService){}

    @ApiOperation({summary: 'Form a protocol'})
    @ApiParam({name: 'id', description: 'Event id'})
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
    @ApiParam({name: 'id', description: 'Event id'})
    @ApiResponse({
        status: 201,
        description: 'Protocols formed',
        type:[SubgroupEntity]
    })
    @Get('/get-by-event/:id')
    get(@Param('id') id: number){
        return this.subgroupsService.get(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update subgroup'})
    @ApiParam({name: 'id', description: 'Identification number' })
    @ApiBody({type: CreateSubgroupDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated club will be returned',
        type: [SubgroupEntity],
    })
    async update(@Param('id') id: number, @Body() createSubgroupDto: CreateSubgroupDto) {
        return await this.subgroupsService.update(id, createSubgroupDto);
    }

}
