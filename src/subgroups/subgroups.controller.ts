import {Body, Controller, Post} from '@nestjs/common';
import {SubgroupsService} from "./subgroups.service";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";


@Controller('subgroups')
@ApiTags('protocols')
export class SubgroupsController {
    constructor( private subgroupsService: SubgroupsService){}

    // @ApiOperation({summary: 'Form a protocol'})
    // @ApiResponse({
    //     status: 201,
    //     description: 'Protocols formed',
    // })
    // @Post()
    // create(){
    //     return this.subgroupsService.create();
    // }

}
