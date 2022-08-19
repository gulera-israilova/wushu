import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {OfpService} from "./ofp.service";
import {OfpEntity} from "./entity/ofp.entity";

@Controller('ofp')
@ApiTags('ofp')
export class OfpController {
    constructor(private ofpService: OfpService) {}

    @ApiOperation({summary: 'Generate OFP for all athletes'})
    @ApiResponse({
        status: 201,
        description: 'Ofp list successfully returned',
        type: [OfpEntity],
    })
    @Get()
    async getOfp() {
        return this.ofpService.getOfp();
    }

    @ApiOperation({summary: 'Get athlete\'s ofp'})
    @ApiParam({name: 'id', description: 'Sportsman id'})
    @ApiQuery({name: 'year', description: 'example: 2022',required:false})
    @ApiResponse({
        status: 201,
        description: 'Ofp list successfully returned',
        type: [OfpEntity],
    })
    @Get('/get-by-sportsman/:id')
    async getBySportsman(@Param('id') id: number,@Query('year') year: number) {
        return this.ofpService.getBySportsman(id,year);
    }

}
