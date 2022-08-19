import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ApplicationEntity} from "./entity/application.entity";
import {AuthService} from "../auth/auth.service";
import {UpdateApplicationDto} from "./dto/update-application.dto";
import {EventsService} from "../events/events.service";

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectRepository(ApplicationEntity)
        private applicationRepository: Repository<ApplicationEntity>,
        private auth: AuthService,
        private eventsService:EventsService
    ) {}

    async create(token, applicationDto): Promise<any> {
        const user = await this.auth.validate(token);

        const event = await this.eventsService.getById(applicationDto.event)
        applicationDto.createDate = new Date()
        event.applicationDeadline = new Date(event.applicationDeadline)
        if (applicationDto.createDate > event.applicationDeadline){
            throw new HttpException("Application time has expired", HttpStatus.BAD_REQUEST);
        }

       try {
            for (let sportsman of applicationDto.sportsmen){
                sportsman.trainer = user.name
                sportsman.trainerId = user.id
                sportsman.event = applicationDto.event
                sportsman.createDate = applicationDto.createDate
                await this.applicationRepository.save(sportsman)
           }
            return {
                status: 201,
                success: true,
                description: "Application successfully submitted",
            }
      } catch (e) {
          throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
      }
    }

    async getByEvent(id: number): Promise<ApplicationEntity[]> {
        let applications = await this.applicationRepository.find({
                where: {
                    event: id
                },
            }
        )

        if (applications.length === 0) {
            throw new NotFoundException("No applications for this event")
        }
        return applications;
    }

    async getById(id: number): Promise<ApplicationEntity> {
        let application = await this.applicationRepository.findOne(id)
        if (!application) {
            throw new NotFoundException("No application for this id")
        }
        return application;
    }

    async getByTrainer(token): Promise<ApplicationEntity[]> {
        const user = await this.auth.validate(token);
        let application = await this.applicationRepository.find({
            where:{
                trainerId:user.id
            }
        })
        if (!application) {
            throw new NotFoundException("No applications by this trainer")
        }
        return application;
    }

    async update(id: number, updateApplicationDto: UpdateApplicationDto): Promise<{ success: boolean; description: string; status: number }> {
        let application = await this.applicationRepository.findOne(id)
        if (!application) {
            throw new HttpException("No application for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            Object.assign(application, updateApplicationDto)
            await this.applicationRepository.save(application)
            return {
                status: 201,
                success: true,
                description: "Application successfully updated",
            }
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: number): Promise<void> {
        const application = await this.applicationRepository.findOne(id)
        if (!application) {throw new NotFoundException("No application for this id")}
       // try {
            await this.applicationRepository.delete(application)
        // } catch (e){
        //     throw new BadGatewayException('Deletion didn\'t happen');
        // }
    }

}
