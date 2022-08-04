import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {SportsmenService} from "./sportsmen.service";
import {ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateSportsmanDto} from "./dto/create-sportsman.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {UpdateSportsmanDto} from "./dto/update-sportsman.dto";
import {filter} from "../utils/file-filter";
import {SportsmanEntity} from "./entity/sportsman.entity";

@Controller('sportsmen')
@ApiTags('sportsmen')
export class SportsmenController {
    constructor(private sportsmenService: SportsmenService) {}

    @ApiOperation({summary: 'Create sportsman'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateSportsmanDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully created employee will be returned',
        type: SportsmanEntity,
    })
    @UseInterceptors(FileInterceptor('reference', {
        fileFilter: filter
    }))

    @Post()
    create(@Body() createSportsmanDto: CreateSportsmanDto,
           @UploadedFile() reference: Express.Multer.File) {
        return this.sportsmenService.create(createSportsmanDto,reference);
    }

    @ApiOperation({summary: 'Get a list of all sportsmen'})
    @ApiResponse({
        status: 201,
        description: 'List of sportsmen returned successfully',
        type: [SportsmanEntity],
    })
    @Get()
    async get() {
        return this.sportsmenService.get();
    }

    @ApiOperation({summary: 'Get sportsman by id'})
    @ApiParam({name: 'id', description: 'Sportsman id'})
    @ApiResponse({
        status: 200,
        description: 'Sportsman returned successfully',
        type: SportsmanEntity,
    })
    @Get('/get-by-id/:id')
    async getById(@Param('id') id: number) {
        return this.sportsmenService.getById(id);
    }

    @ApiOperation({summary: 'Get sportsmen by club'})
    @ApiParam({name: 'id', description: 'Club id'})
    @ApiResponse({
        status: 200,
        description: 'Sportsmen returned successfully',
        type: SportsmanEntity,
    })
    @Get('/get-by-club/:id')
    async getByClub(@Param('id') id: number) {
        return this.sportsmenService.getByClub(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update sportsman'})
    @ApiConsumes('multipart/form-data')
    @ApiParam({name: 'id', description: 'Identification number' })
    @ApiBody({type: UpdateSportsmanDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated sportsman will be returned',
        type: SportsmanEntity,
    })
    @UseInterceptors(FileInterceptor('reference', {
        fileFilter: filter
    }))
    async update(@Param('id') id: number, @Body() updateSportsmanDto: UpdateSportsmanDto,
                 @UploadedFile() reference: Express.Multer.File) {
        return await this.sportsmenService.update(id, updateSportsmanDto,reference);
    }

    @ApiOperation({summary: 'Delete sportsman'})
    @ApiParam({name:"id",description:"Sportsman id"})
    @ApiResponse({status: 200, description: 'Sportsman deleted successfully'})
    @ApiResponse({status: 404, description: 'Sportsman not found'})
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.sportsmenService.destroy(id);
    }
}
