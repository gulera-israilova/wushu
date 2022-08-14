import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {NewsService} from "./news.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {filter} from "../utils/file-filter";
import {CreateNewsDto} from "./dto/create-news.dto";
import {NewsEntity} from "./entity/news.entity";
import {UpdateNewsDto} from "./dto/update-news.dto";

@Controller('news')
@ApiTags('news')
export class NewsController {
    constructor(private newsService: NewsService) {}

    @ApiOperation({summary: 'Create news'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateNewsDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully created news will be returned',
        type: NewsEntity,
    })
    @UseInterceptors(FileInterceptor('image', {
        fileFilter: filter
    }))

    @Post()
    create(@Body() createNewsDto: CreateNewsDto,@UploadedFile() image: Express.Multer.File) {
        return this.newsService.create(createNewsDto,image);
    }

    @ApiOperation({summary: 'Get a list of all news'})
    @ApiResponse({
        status: 201,
        description: 'List of news returned successfully',
        type: [NewsEntity],
    })
    @Get()
    async get() {
        return this.newsService.get();
    }

    @ApiOperation({summary: 'Get news by id'})
    @ApiParam({name: 'id', description: 'News id'})
    @ApiResponse({
        status: 200,
        description: 'News returned successfully',
        type: [NewsEntity],
    })
    @Get('/get-by-id/:id')
    async getById(@Param('id') id: number) {
        return this.newsService.getById(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update news'})
    @ApiConsumes('multipart/form-data')
    @ApiParam({name: 'id', description: 'Identification number' })
    @ApiBody({type: UpdateNewsDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated club will be returned',
        type: [NewsEntity],
    })
    @UseInterceptors(FileInterceptor('image', {
        fileFilter: filter
    }))
    async update(@Param('id') id: number, @Body() updateNewsDto: UpdateNewsDto,@UploadedFile() image: Express.Multer.File) {
        return await this.newsService.update(id, updateNewsDto,image);
    }

    @ApiOperation({summary: 'Delete news'})
    @ApiParam({name:"id",description:"News id"})
    @ApiResponse({status: 200, description: 'News deleted successfully'})
    @ApiResponse({status: 404, description: 'News not found'})
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.newsService.destroy(id);
    }

}
