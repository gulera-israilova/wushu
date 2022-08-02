import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SubgroupEntity} from "./entity/subgroup.entity";
import {EventEntity} from "../events/entity/event.entity";

@Injectable()
export class SubgroupsService {
    constructor(@InjectRepository(SubgroupEntity)
                private subgroupRepository:Repository<SubgroupEntity>) {}

    // async create(): Promise<{ success: boolean; description: string; status: number }> {
    //     try {
    //
    //         return {
    //             status: 201,
    //             success: true,
    //             description: "Protocols formed",
    //         }
    //
    //     } catch (e) {
    //         throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
    //     }
    // }

}
