import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SportsmenService} from "../sportsmen/sportsmen.service";
import {AchievementRatingEntity} from "./entity/achievement-rating.entity";
import {AchievementsService} from "../achievements/achievements.service";
import {CreateAchievementRatingDto} from "./dto/create-achievement-rating-dto";
import {UpdateOfpDto} from "../sportsmen/dto/update-ofp.dto";
import {UpdatePointsDto} from "./dto/update-points.dto";

@Injectable()
export class AchievementRatingService {
    constructor(
        @InjectRepository(AchievementRatingEntity)
        private achievementRatingRepository: Repository<AchievementRatingEntity>,
        private achievementsService: AchievementsService,
        private sportsmenService: SportsmenService ) {
    }

    async getOfp(): Promise<AchievementRatingEntity[]> {
        let date = new Date()
        let year = date.getFullYear()
        let sportsmen = await this.sportsmenService.get()
        for ( let sportsman of sportsmen){
            await this.generateOfp(sportsman.id)
            let currentPoints = await this.getOfpBySportsmanByYear(sportsman.id,year)
            if(currentPoints){
                let updatePoints = new UpdatePointsDto()
                updatePoints.points = currentPoints.points
                await this.sportsmenService.updatePoints(sportsman.id,updatePoints)
            }
        }
        return await this.achievementRatingRepository.find()
    }

    async getBySportsman(id: number,year:number): Promise<AchievementRatingEntity[]> {
        if (year){
             await this.achievementRatingRepository.find({
                where: {
                    sportsman: id,
                    year: year
                }
            });
        }

        let ofp = await this.achievementRatingRepository.find({
            where: {
                sportsman: id,
            }
        });

        return ofp;
    }

    async getOfpBySportsmanByYear(id:number,year:number) {
        return await this.achievementRatingRepository.findOne({
            where: {
                sportsman: id,
                year: year,
            }
        });
    }

    async  generateOfp (id:number){
        let standards = await this.achievementsService.getBySportsman(id)
        let map = standards.reduce((r, i) => {
            r[i.year] = r[i.year] || [];
            r[i.year].push(i);
            return r;
        }, {});
        let array = [];
        for (let key in map) {
            array.push(map[key]);
        }
        for (let arr of array){
            let sum = 0
            let year = 0
            for (let item of arr){
                sum += item.grade
                year = item.year
            }
            let obj = new CreateAchievementRatingDto()
            obj.points = sum/arr.length
            obj.year = year
            obj.sportsman = id
            let sportsman = await this.achievementRatingRepository.findOne({
                where: {
                    sportsman: obj.sportsman,
                    year: obj.year
                }
            })
            if (sportsman) {
                Object.assign(sportsman, obj)
                await this.achievementRatingRepository.save(sportsman)
            } else { // @ts-ignore
                await this.achievementRatingRepository.save(obj)
            }
        }
    }
}
