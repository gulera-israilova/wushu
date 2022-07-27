import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {DocsService} from "./docs.service";
import {ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateDocsDto} from "./dto/create-docs.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {filter} from "../utils/file-filter";
import {DocsEntity} from "./entity/docs.entity";
import {UpdateDocsDto} from "./dto/update-docs.dto";
import {CreateSportsmanDto} from "../sportsmen/dto/create-sportsman.dto";

@Controller('docs')
@ApiTags('docs')
export class DocsController {
    constructor(private docsService: DocsService) {}

    @ApiOperation({summary: 'Create document'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({type: CreateDocsDto})
    @ApiResponse({
        status: 201,
        description: 'The created document has been successfully saved to the database',
    })
    @UseInterceptors(FileInterceptor('docs', {
        fileFilter: filter
    }))

    @Post()
    async create(@Body() createDocsDto: CreateDocsDto,
                 @UploadedFile() docs:Express.Multer.File) {
        return this.docsService.create(createDocsDto,docs);
    }

    @ApiOperation({summary: 'Get a list of all documents'})
    @ApiResponse({
        status: 201,
        description: 'List of docs returned successfully',
        type: [DocsEntity],
    })
    @Get()
    async get() {
        return this.docsService.get();
    }

    @ApiOperation({summary: 'Get document by id'})
    @ApiParam({name: 'id', description: 'Document id'})
    @ApiResponse({
        status: 200,
        description: 'Document returned successfully',
        type: DocsEntity,
    })
    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
        return this.docsService.getById(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update news'})
    @ApiConsumes('multipart/form-data')
    @ApiParam({name: 'id', description: 'Identification number' })
    @ApiBody({type: UpdateDocsDto})
    @ApiResponse({
        status: 201,
        description: 'The updated document has been successfully saved to the database',
    })
    @UseInterceptors(FileInterceptor('docs', {
        fileFilter: filter
    }))
    async update(@Param('id') id: number, @Body() updateDocsDto: UpdateDocsDto,@UploadedFile() docs: Express.Multer.File) {
        return await this.docsService.update(id, updateDocsDto,docs);
    }

    @ApiOperation({summary: 'Delete document'})
    @ApiParam({name:"id",description:"Document id"})
    @ApiResponse({status: 200, description: 'Document deleted successfully'})
    @ApiResponse({status: 404, description: 'Document not found'})
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.docsService.destroy(id);
    }

}
