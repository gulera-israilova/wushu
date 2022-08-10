import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SubgroupEntity} from "./entity/subgroup.entity";
import {ApplicationsService} from "../applications/applications.service";

@Injectable()
export class SubgroupsService {
    constructor(@InjectRepository(SubgroupEntity)
                private subgroupRepository:Repository<SubgroupEntity>,
                private applicationsService:ApplicationsService) {}

    async get(id:number): Promise<any> {
    let participants = await this.applicationsService.getByEvent(id)
        return participants
    }

}
