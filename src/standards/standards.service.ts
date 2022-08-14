import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeepPartial, Repository} from "typeorm";
import {StandardEntity} from "./entity/standard.entity";
import {UpdateStandardDto} from "./dto/update-standard.dto";


@Injectable()
export class StandardsService {

    constructor(
        @InjectRepository(StandardEntity)
        private standardRepository: Repository<StandardEntity>) {}

    async create(standardDto): Promise<DeepPartial<StandardEntity>[]> {
        let response =[]
       try {
            for (let standard of standardDto.standards) {
                standard.sportsman = standardDto.sportsman
                let st = await this.standardRepository.save(standard)
                response.push(st)
            }
            return response
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async getById(id: number): Promise<StandardEntity> {
        let standard = await this.standardRepository.findOne(id)
        if (!standard) {
            throw new NotFoundException("No sportsman for this id")
        }
        return standard;

    }

    async getBySportsman(id: number): Promise<StandardEntity[]> {
        let standards = await this.standardRepository.find({
            where: {
                sportsman: id,
            }
        });
        if (standards.length === 0) {
            throw new NotFoundException("No standards for this sportsman")
        }
        return standards;
    }

    async update(id: number, updateStandardDto: UpdateStandardDto): Promise<StandardEntity> {
        let standard = await this.standardRepository.findOne(id)
        if (!standard) {
            throw new HttpException("No standard for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            Object.assign(standard, updateStandardDto)
            return await this.standardRepository.save(standard)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: number): Promise<void> {
        const standard = await this.standardRepository.findOne(id)
        if (!standard) {
            throw new NotFoundException("No sportsman for this id")
        }
        try {
            await this.standardRepository.delete(standard)
        } catch (e) {
            throw new BadGatewayException('Deletion didn\'t happen');
        }
    }

}
