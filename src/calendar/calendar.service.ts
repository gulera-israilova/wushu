import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CalendarEntity} from "./entity/calendar.entity";
import {EditEventInCalendarDto} from "./dto/edit-event-in-calendar.dto";

@Injectable()
export class CalendarService {
    constructor(
        @InjectRepository(CalendarEntity)
        private calendarRepository: Repository<CalendarEntity>) {}

    async createEventForCalendar(addEventToCalendarDto): Promise<CalendarEntity> {
        try {
            return await this.calendarRepository.save(addEventToCalendarDto)

        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async getEventsFromCalendar(): Promise<CalendarEntity[]> {
        return await this.calendarRepository.find();
    }

    async getByIdEventFromCalendar(id:number): Promise<CalendarEntity> {
        let event = await this.calendarRepository.findOne(id)
        if (!event) {
            throw new NotFoundException("No event for this id")
        }
        return event;
    }

    async updateEventForCalendar(id :number,editEventInCalendarDto:EditEventInCalendarDto): Promise<CalendarEntity> {
        let event = await this.calendarRepository.findOne(id)
        if (!event) {
            throw new HttpException("No news for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            Object.assign(event, editEventInCalendarDto)
           return await this.calendarRepository.save(event)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async destroyEventFromCalendar(id:number): Promise<any> {
        let event = await this.calendarRepository.findOne(id);
        if (!event) {
            throw new NotFoundException('No event for this id');
        }
        try {
            await this.calendarRepository.delete(id);
        } catch (e) {
            throw new BadGatewayException("Deletion didn't happen");
        }
    }
}
