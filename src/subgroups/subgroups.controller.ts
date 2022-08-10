import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {SubgroupsService} from "./subgroups.service";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StandardEntity} from "../standards/entity/standard.entity";
import {SubgroupEntity} from "./entity/subgroup.entity";


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
    @Get('/get-by-event/:id')
    get(@Param('id') id: number){
        return this.subgroupsService.get(id);
    }


}
