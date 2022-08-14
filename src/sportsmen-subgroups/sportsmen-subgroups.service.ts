import {BadGatewayException, BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SportsmanSubgroupEntity} from "./entity/sportsman-subgroup.entity";
import {SportsmanSubgroupsDto} from "./dto/sportsman-subgroups.dto";

@Injectable()
export class SportsmenSubgroupsService {
    constructor(
        @InjectRepository(SportsmanSubgroupEntity)
        private sportsmanSubgroupRepository: Repository<SportsmanSubgroupEntity>,
    ) {}

    async create(data): Promise<SportsmanSubgroupEntity[]> {
        try {
            let sportsmanSubgroupDto = new SportsmanSubgroupsDto()
            sportsmanSubgroupDto.application = data.id

            return await this.sportsmanSubgroupRepository.save(data)
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    async get(options = {}): Promise<SportsmanSubgroupEntity[]> {
        return await this.sportsmanSubgroupRepository.find({
            where: options,
            relations: ["subgroup","application"]
        })
    }
    async getById(id:number): Promise<SportsmanSubgroupEntity> {
        return await this.sportsmanSubgroupRepository.findOne({
            where: {
                id:id
            },
            relations: ["subgroup","application"]
        })
    }
    async delete(id: number): Promise<any> {
        const entity: SportsmanSubgroupEntity = await this.sportsmanSubgroupRepository.findOne({id});
        if (!entity) {
            throw new NotFoundException(
                `Данного цветка в составе букета нет`,
            );
        }
        try {
            await this.sportsmanSubgroupRepository.delete(entity);
            return {
                status: 200,
                success: true,
                description: 'Application successfully removed from subgroup\'s applications'
            };
        } catch (e) {
            throw new BadGatewayException(e.message);
        }
    }
    async removeUseless(entities: SportsmanSubgroupEntity[]): Promise<void> {
        for (const entity of entities) {
            await this.delete(entity.id);
        }
    }
    async edit(id: number, data: SportsmanSubgroupsDto): Promise<any> {
        const entity: SportsmanSubgroupEntity = await this.sportsmanSubgroupRepository.findOne({id});
        if (!entity) {
            throw new NotFoundException(
                `Данного заявления в подгруппе нет`,
            );
        }
        try {
            Object.assign(entity, data);
            await this.sportsmanSubgroupRepository.save(entity);
            return {
                status: 200,
                success: true,
                description: 'SubgroupApplication updated successfully'
            };
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

}
