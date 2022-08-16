import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AchievementEntity} from "./entity/achievement.entity";
import {UpdateAchievementDto} from "./dto/update-achievement.dto";
import {RankEnum} from "./enum/rank.enum";
import {type} from "os";

@Injectable()
export class AchievementsService {
    constructor(
        @InjectRepository(AchievementEntity)
        private achievementRepository: Repository<AchievementEntity>) {}

    async create(createAchievementDto): Promise<AchievementEntity> {
        try {
            createAchievementDto.grade = await this.grade(createAchievementDto.rank,createAchievementDto.place)
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
        return await this.achievementRepository.find({
            where: {
                sportsman: id,
            }
        });
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

    private async grade(rank:string,place:number) {
        let point = 0
        if(rank === RankEnum.E){
            if(place === 3) point = 1
            if(place === 2) point = 2
            if(place === 1) point = 3
        }
        if(rank === RankEnum.D){
            if(place === 3) point = 4
            if(place === 2) point = 5
            if(place === 1) point = 6
        }
        if(rank === RankEnum.C){
            if(place === 3) point = 7
            if(place === 2) point = 8
            if(place === 1) point = 9
        }
        if(rank === RankEnum.B){
            if(place === 3) point = 10
            if(place === 2) point = 11
            if(place === 1) point = 12
        }
        if(rank === RankEnum.A){
            if(place === 3) point = 13
            if(place === 2) point = 14
            if(place === 1) point = 15
        }
        console.log(typeof point)
        return point;
    }

}
