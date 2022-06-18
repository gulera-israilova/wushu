import {Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {EventsService} from "./events.service";
import {CreateEventDto} from "./dto/create-event.dto";
import {EventEntity} from "./entity/event.entity";
import {UpdateEventDto} from "./dto/update-event.dto";

@Controller('events')
@ApiTags('events')
export class EventsController {
    constructor(private eventsService: EventsService) {}

    @ApiOperation({summary: 'Create event'})
    @ApiBody({type: CreateEventDto})
    @ApiResponse({
        status: 201,
        description: 'Successfully created news will be returned',
        type: EventEntity,
    })
    @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

    @ApiOperation({summary: 'Get a list of all new events'})
    @ApiResponse({
        status: 201,
        description: 'List of new events returned successfully',
        type: [EventEntity],
    })
    @Get('/newEvents')
    async getNewEvents() {
        return this.eventsService.getNewEvents();
    }

    @ApiOperation({summary: 'Get a list of all past events'})
    @ApiResponse({
        status: 201,
        description: 'List of past events returned successfully',
        type: [EventEntity],
    })
    @Get('/pastEvents')
    async getPastEvents() {
        return this.eventsService.getPastEvents();
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
