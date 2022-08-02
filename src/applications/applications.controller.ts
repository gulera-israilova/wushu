import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ApplicationsService} from "./applications.service";
import {ApplicationEntity} from "./entity/application.entity";
import {ApplicationDto} from "./dto/application.dto";
import {TrainerGuard} from "../guards/trainer.guard";
import {EventEntity} from "../events/entity/event.entity";
import {UpdateEventDto} from "../events/dto/update-event.dto";
import {UpdateApplicationDto} from "./dto/update-application.dto";
import {SecretaryGuard} from "../guards/secretary.guard";


@Controller('applications')
@ApiTags('applications')
export class ApplicationsController {
    constructor(private applicationsService: ApplicationsService) {}

    @ApiBearerAuth()
    @ApiOperation({summary: 'Create application'})
    @ApiBody({type: ApplicationDto})
    @ApiResponse({
        status: 201,
        description: 'Application successfully submitted',
    })
    @UseGuards(TrainerGuard)
    @Post()
    create(@Req() req,@Body() applicationDto: ApplicationDto) {
        return this.applicationsService.create(req.headers.authorization,applicationDto);
    }

    @ApiOperation({summary: 'Get applications by event'})
    @ApiParam({name: 'id', description: 'Event id'})
    @ApiResponse({
        status: 200,
        description: 'Applications returned successfully',
        type: [ApplicationEntity],
    })
    @Get('/getByEvent/:id')
    async getByEvent(@Param('id') id: number) {
        return this.applicationsService.getByEvent(id);
    }

    @ApiOperation({summary: 'Get application by id'})
    @ApiParam({name: 'id', description: 'Application id'})
    @ApiResponse({
        status: 200,
        description: 'Application returned successfully',
        type: [ApplicationEntity],
    })
    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
        return this.applicationsService.getById(id);
    }

   // @ApiBearerAuth()
    @ApiOperation({summary: 'Update application'})
    @ApiParam({name: 'id', description: 'Identification number' })
    @ApiBody({type: UpdateApplicationDto})
    @ApiResponse({
        status: 201,
        description: 'Application successfully updated',
    })
   // @UseGuards(SecretaryGuard)
    @Patch(':id')
    async update(@Req() req,@Param('id') id: number, @Body() updateApplicationDto: UpdateApplicationDto) {
        return await this.applicationsService.update(id, updateApplicationDto);
    }

    @ApiOperation({summary: 'Delete application'})
    @ApiParam({name:"id",description:"Application id"})
    @ApiResponse({status: 200, description: 'Application deleted successfully'})
    @ApiResponse({status: 404, description: 'Application not found'})
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.applicationsService.destroy(id);
    }
}
