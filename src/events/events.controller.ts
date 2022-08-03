import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UploadedFile, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {EventsService} from "./events.service";
import {CreateEventDto} from "./dto/create-event.dto";
import {EventEntity} from "./entity/event.entity";
import {UpdateEventDto} from "./dto/update-event.dto";
import {AdminGuard} from "../guards/admin.guard";
import {SecretaryGuard} from "../guards/secretary.guard";

@Controller('events')
@ApiTags('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

  //  @ApiBearerAuth()
    @ApiOperation({summary: 'Create event'})
    @ApiBody({type: CreateEventDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully created news will be returned',
        type: EventEntity,
    })
   // @UseGuards(SecretaryGuard)
    @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

    // Get events by date (Marlen)
    @ApiOperation({summary: 'Get a list of all events'})
    @ApiQuery({name: 'start', description: 'example: 2022-03-03',required:false})
    @ApiQuery({name: 'end', description: 'example: 2022-03-03',required:false})
    @ApiResponse({
        status: 201,
        description: 'List of events returned successfully',
        type: [EventEntity],
    })
    @Get('by-date')
    async getEventsByDate(@Query('start') start: Date,@Query('end') end: Date,) {
        return this.eventsService.getEventsByDate(start,end);
    }

    @ApiOperation({summary: 'Get a list of all events'})
    @ApiQuery({name: 'start', description: 'example: 2022-03-03',required:false})
    @ApiQuery({name: 'end', description: 'example: 2022-03-03',required:false})
    @ApiResponse({
        status: 201,
        description: 'List of events returned successfully',
        type: [EventEntity],
    })
    @Get()
    async getEvents(@Query('start') start: Date,@Query('end') end: Date,) {
        return this.eventsService.getEvents(start,end);
    }

    @ApiOperation({summary: 'Get event by id'})
    @ApiParam({name: 'id', description: 'Event id'})
    @ApiResponse({
        status: 200,
        description: 'Events returned successfully',
        type: [EventEntity],
    })
    @Get('/getById/:id')
    async getById(@Param('id') id: number) {
        return this.eventsService.getById(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update event'})
    @ApiParam({name: 'id', description: 'Identification number' })
    @ApiBody({type: UpdateEventDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully updated club will be returned',
        type: [EventEntity],
    })
    async update(@Param('id') id: number, @Body() updateEventDto: UpdateEventDto) {
        return await this.eventsService.update(id, updateEventDto);
    }

    @ApiOperation({summary: 'Delete event'})
    @ApiParam({name:"id",description:"Event id"})
    @ApiResponse({status: 200, description: 'Event deleted successfully'})
    @ApiResponse({status: 404, description: 'Event not found'})
    @Delete(':id')
    destroy(@Param('id') id: number) {
        return this.eventsService.destroy(id);
    }
}
