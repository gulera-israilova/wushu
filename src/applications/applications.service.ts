import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ApplicationEntity} from "./entity/application.entity";
import {AuthService} from "../auth/auth.service";
import {UpdateApplicationDto} from "./dto/update-application.dto";

@Injectable()
export class ApplicationsService {
    constructor(
        @InjectRepository(ApplicationEntity)
        private applicationRepository: Repository<ApplicationEntity>,
        private auth: AuthService
    ) {}

    async create(token, applicationDto): Promise<any> {
        const user = await this.auth.validate(token);
        try {
            for (let sportsman of applicationDto.sportsman){
                sportsman.trainer = user.name
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
            where:{
                event:id,
            }
        })
        for (let application of applications){
            // @ts-ignore
            application.event = application.event.title
        }
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
       // @ts-ignore
        application.event = application.event.title
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
        try {
            await this.applicationRepository.delete(application)
        } catch (e){
            throw new BadGatewayException('Deletion didn\'t happen');
        }
    }

}
