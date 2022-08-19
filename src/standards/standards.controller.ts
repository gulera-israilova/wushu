import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {StandardsService} from "./standards.service";
import {StandardsDto} from "./dto/standards.dto";
import {StandardEntity} from "./entity/standard.entity";
import {UpdateStandardDto} from "./dto/update-standard.dto";

@Controller('standards')
@ApiTags('standards')
export class StandardsController {
    constructor(private standardsService: StandardsService) {}

    @ApiOperation({summary: 'Add athlete standards'})
    @ApiBody({type: StandardsDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully created standard will be returned',
        type: [StandardEntity],
    })

    @Post()
    create(@Body() standardsDto: StandardsDto) {
        return this.standardsService.create(standardsDto);
    }

    @ApiOperation({summary: 'Get athlete\'s standards'})
    @ApiParam({name: 'id', description: 'Sportsman id'})
    @ApiResponse({
        status: 201,
        description: 'Standards list successfully returned',
        type: [StandardEntity],
    })
    @Get('/get-by-sportsman/:id')
    async getBySportsman(@Param('id') id: number) {
        return this.standardsService.getBySportsman(id);
    }

    @ApiOperation({summary: 'Get standard by id'})
    @ApiParam({name: 'id', description: 'Standard id'})
    @ApiResponse({
        status: 200,
        description: 'Standard returned successfully',
        type: StandardEntity,
    })
    @Get('/get-by-id/:id')
    async getById(@Param('id') id: number) {
        return this.standardsService.getById(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update athlete\'s standard'})
    @ApiParam({name: 'id', description: 'Standard id' })
    @ApiBody({type: UpdateStandardDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated standard will be returned',
        type: StandardEntity,
    })
    async update(@Param('id') id: number, @Body() updateStandardDto: UpdateStandardDto) {
        return await this.standardsService.update(id, updateStandardDto);
    }

    @ApiOperation({summary: 'Delete standard'})
    @ApiParam({name:"id",description:"Standard id"})
    @ApiResponse({status: 200, description: 'Standard deleted successfully'})
    @ApiResponse({status: 404, description: 'Standard not found'})
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.standardsService.destroy(id);
    }

}
