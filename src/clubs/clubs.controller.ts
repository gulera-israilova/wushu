import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ClubsService} from "./clubs.service";
import {CreateClubDto} from "./dto/create-club.dto";
import {ClubEntity} from "./entity/club.entity";
import {UpdateClubDto} from "./dto/update-club.dto";

@Controller('clubs')
@ApiTags('clubs')
export class ClubsController {
    constructor( private clubsService: ClubsService) {}

    @ApiOperation({summary: 'Create club'})
    @ApiBody({type: CreateClubDto})
    @ApiResponse({
        status: 200,
        description: 'Successfully created club will be returned',
        type: ClubEntity,
    })
    @Post()
    create(@Body() createClubDto:CreateClubDto){
        return this.clubsService.create(createClubDto);
    }


    @ApiOperation({summary: 'Get a list of all clubs'})
    @ApiResponse({
        status: 201,
        description: 'List of clubs returned successfully',
        type: [ClubEntity],
    })
    @Get()
    async get() {
        return this.clubsService.get();
    }

    @ApiOperation({summary: 'Get club by id'})
    @ApiParam({name: 'id', description: 'Club id'})
    @ApiResponse({
        status: 200,
        description: 'Club returned successfully',
        type: [ClubEntity],
    })
    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
        return this.clubsService.getById(id);
    }


    @Patch(':id')
    @ApiOperation({summary: 'Update club'})
    @ApiParam({name: 'id', description: 'Identification number' })
    @ApiBody({type: UpdateClubDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated club will be returned',
        type: [ClubEntity],
    })
    async update(@Param('id') id: number, @Body() updateClubDto: UpdateClubDto) {
        return await this.clubsService.update(id, updateClubDto);
    }

    @ApiOperation({summary: 'Delete club'})
    @ApiParam({name:"id",description:"Club id"})
    @ApiResponse({status: 200, description: 'Club deleted successfully'})
    @ApiResponse({status: 404, description: 'Club not found'})
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.clubsService.destroy(id);
    }
}
