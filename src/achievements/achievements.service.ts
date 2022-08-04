import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AchievementEntity} from "./entity/achievement.entity";
import {SportsmanEntity} from "../sportsmen/entity/sportsman.entity";
import {UpdateSportsmanDto} from "../sportsmen/dto/update-sportsman.dto";
import {UpdateAchievementDto} from "./dto/update-achievement.dto";

@Injectable()
export class AchievementsService {
    constructor(
        @InjectRepository(AchievementEntity)
        private achievementRepository: Repository<AchievementEntity>) {}

    async create(createAchievementDto): Promise<AchievementEntity> {
        try {
            return await this.achievementRepository.save(createAchievementDto)

        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async getById(id: number): Promise<AchievementEntity> {
        let achievement = await this.achievementRepository.findOne(id)
        if (!achievement) {
            throw new NotFoundException("No sportsman for this id")
        }
        return achievement;
    }

    async getBySportsman(id: number): Promise<AchievementEntity[]> {
        let achievement = await this.achievementRepository.find({
            where: {
                sportsman: id,
            }
        });
        if (achievement.length === 0) {
            throw new NotFoundException("No achievement for this sportsman")
        }
        return achievement;
    }

    async update(id: number, updateAchievementDto: UpdateAchievementDto): Promise<AchievementEntity> {
        let achievement = await this.achievementRepository.findOne(id)
        if (!achievement) {
            throw new HttpException("No achievement for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            Object.assign(achievement, updateAchievementDto)
            return await this.achievementRepository.save(achievement)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: number): Promise<void> {
        const achievement = await this.achievementRepository.findOne(id)
        if (!achievement) {
            throw new NotFoundException("No sportsman for this id")
        }
        try {
            await this.achievementRepository.delete(achievement)
        } catch (e) {
            throw new BadGatewayException('Deletion didn\'t happen');
        }
    }

}
