import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Between, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository} from "typeorm";
import {EventEntity} from "./entity/event.entity";
import {UpdateEventDto} from "./dto/update-event.dto";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>,
        private auth: AuthService,) {}

    async create( createEventDto): Promise<EventEntity> {
        try {
            return  await this.eventRepository.save(createEventDto)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    // Get event list by date (Marlen)
    async getEventsByDate(start: Date, end: Date): Promise<EventEntity[]> {
        if (start || end) {
            if (!start) return this.eventRepository.find({
                where: {
                    end: LessThan(new Date(end))
                }
            });
            else if (!end) return this.eventRepository.find({
                where: {
                    end: MoreThan(new Date(start))
                }
            });
            return this.eventRepository.find({
                where: {
                    end: Between(new Date(start), new Date(end))
                }
            });
        }
        return this.eventRepository.find();
    }

    async getEvents(start:Date,end:Date): Promise<EventEntity[]> {
        let events = []
        if (start !== undefined && end !== undefined) {
            let startedAt = new Date(start)
            let endedAt = new Date(end)
            events = await this.eventRepository.find(
                {
                    where:
                        {
                            end: Between(startedAt, endedAt)
                        }
                })
        } else events = await this.eventRepository.find()
        for (let event of events) {
           event = await this.getEventFormat(event)
        }
        return events;
    }

    async getById(id: number): Promise<EventEntity> {
        let event = await this.eventRepository.findOne(id)
        if (!event) {
            throw new NotFoundException("No event for this id")
        }
        event = await this.getEventFormat(event)
        return event;
    }
    async getByIdEvent (id:number):Promise<EventEntity>{
        return await this.eventRepository.findOne(id)
    }

    async update(id: number, updateEventDto: UpdateEventDto): Promise<EventEntity> {
        let event = await this.eventRepository.findOne(id)
        if (!event) {
            throw new HttpException("No event for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            Object.assign(event, updateEventDto)
            return await this.eventRepository.save(event)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: number): Promise<void> {
        const event = await this.eventRepository.findOne(id)
        if (!event) {throw new NotFoundException("No event for this id")}
        try {
            await this.eventRepository.delete(event)
        } catch (e){
            throw new BadGatewayException('Deletion didn\'t happen');
        }
    }

    private async getEventFormat(event:EventEntity){
        let monthList = [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ]
        event.month = monthList[new Date(event.start).getMonth()]
        // @ts-ignore
        event.start = event.start.split('-').reverse().join('.')
        // @ts-ignore
        event.end = event.end.split('-').reverse().join('.')
        // @ts-ignore
        event.applicationDeadline = event.applicationDeadline.split('-').reverse().join('.')
        // @ts-ignore
        event.day = +event.start.split('.')[0]
        return event;
    }
}
