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
import {UserGuard} from "../guards/user.guard";
import {AdminGuard} from "../guards/admin.guard";
import {CalendarService} from "./calendar.service";
import {CalendarEntity} from "./entity/calendar.entity";
import {AddEventToCalendarDto} from "./dto/add-event-to-calendar.dto";
import {EditEventInCalendarDto} from "./dto/edit-event-in-calendar.dto";

@Controller('calendar')
@ApiTags('calendar')
export class CalendarController {
    constructor(private calendarService: CalendarService) {}

   // @ApiBearerAuth()
    @ApiOperation({summary: 'Create event'})
    @ApiBody({type: AddEventToCalendarDto})
    @ApiResponse({
        status: 201,
        description: 'The event was successfully saved to the calendar',
    })
   // @UseGuards(AdminGuard)
    @Post()
    createEventForCalendar(@Req() req,@Body() addEventToCalendarDto: AddEventToCalendarDto) {
        return this.calendarService.createEventForCalendar(addEventToCalendarDto);
    }

    @ApiOperation({summary: 'Get a list of all events'})
    @ApiResponse({
        status: 201,
        description: 'List of events returned successfully',
        type: [CalendarEntity],
    })
    @Get()
    async getEventsFromCalendar() {
        return this.calendarService.getEventsFromCalendar();
    }

    @ApiOperation({summary: 'Get event by id'})
    @ApiParam({name: 'id', description: 'Event id'})
    @ApiResponse({
        status: 200,
        description: 'Events returned successfully',
        type: [CalendarEntity],
    })
    @Get('/getById/:id')
    async getByIdEventFromCalendar(@Param('id') id: number) {
        return this.calendarService.getByIdEventFromCalendar(id);
    }

    // @ApiBearerAuth()
    // @UseGuards(AdminGuard)
    @Patch(':id')
    @ApiOperation({summary: 'Update event'})
    @ApiParam({name: 'id', description: 'Identification number' })
    @ApiBody({type: EditEventInCalendarDto})
    @ApiResponse({
        status: 201,
        description: 'The event was successfully updated in the calendar'
    })
    async updateEventForCalendar(@Param('id') id: number, @Body() editEventInCalendarDto: EditEventInCalendarDto) {
        return await this.calendarService.updateEventForCalendar(id, editEventInCalendarDto);
    }

    // @ApiBearerAuth()
    // @UseGuards(AdminGuard)
    @ApiOperation({summary: 'Delete event'})
    @ApiParam({name:"id",description:"Event id"})
    @ApiResponse({status: 200, description: 'Event deleted successfully'})
    @ApiResponse({status: 404, description: 'Event not found'})
    @Delete(':id')
    destroyEventFromCalendar(@Req() req,@Param('id') id: number) {
        return this.calendarService.destroyEventFromCalendar(id);
    }
}
