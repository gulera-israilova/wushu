import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LessThan, MoreThanOrEqual, Repository} from "typeorm";
import {EventEntity} from "./entity/event.entity";
import {UpdateEventDto} from "./dto/update-event.dto";

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(EventEntity)
        private eventRepository: Repository<EventEntity>) {}

    async create(createEventDto): Promise<EventEntity> {
        try {
            return  await this.eventRepository.save(createEventDto)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async getNewEvents(): Promise<EventEntity[]> {
        let currentDate = new Date()
        return await this.eventRepository.find({
            where: {
                date: MoreThanOrEqual(currentDate)
            }
        });
    }

    async getPastEvents(): Promise<EventEntity[]> {
        let currentDate = new Date()
        return await this.eventRepository.find({
            where: {
                date: LessThan(currentDate),
            }
        });
    }

    async getById(id: number): Promise<EventEntity> {
        let event = await this.eventRepository.findOne(id)
        if (!event) {
            throw new NotFoundException("No event for this id")
        }
        return this.eventRepository.findOne(id);
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
}
