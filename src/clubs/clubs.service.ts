import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ClubEntity} from "./entity/club.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {UpdateClubDto} from "./dto/update-club.dto";
import {RoleEnum} from "../users/enum/role.enum";
import {AchievementRatingService} from "../achievement-rating/achievement-rating.service";
import {OfpService} from "../ofp/ofp.service";
import {CreateOfpDto} from "../ofp/dto/create-ofp.dto";
import {OfpResponseDto} from "./dto/ofp-response.dto";
import {AchievementRatingResponseDto} from "./dto/achievement-rating-response.dto";


@Injectable()
export class ClubsService {
    constructor(@InjectRepository(ClubEntity)
                private clubRepository:Repository<ClubEntity>,
                private usersService:UsersService,
                private ofpService:OfpService,
                private achievementRatingService:AchievementRatingService
                ) {}


    async create(createClubDto): Promise<ClubEntity> {
        let club = await this.clubRepository.findOne({
            where: {
                name: createClubDto.name
            }
        })
        if(club) {
            throw new HttpException("Club with this name already exists", HttpStatus.BAD_REQUEST)
        }
        try {
            let trainers = []
            for (let item of createClubDto.trainers) {
                const trainer = await this.usersService.getById(item)
                if (trainer.role === RoleEnum.TRAINER){
                    trainers.push(trainer)
                } else  throw new HttpException("Please enter correct trainer IDs", HttpStatus.BAD_REQUEST);
            }
            let newClub = new ClubEntity()
            newClub.name = createClubDto.name
            newClub.options = createClubDto.options
            newClub.trainers = trainers
            return await this.clubRepository.save(newClub)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async get(): Promise<ClubEntity[]> {
        let date = new Date()
        let year = date.getFullYear()
        let clubs = await this.clubRepository.find({
            relations:['trainers','sportsmen']
        })
        for (let club of clubs ){
            let ofpSum = 0
            let pointsSum = 0
            if(club.sportsmen && club.sportsmen.length!==0){
                for(let sportsman of club.sportsmen) {
                    let ofp = await this.ofpService.getOfpBySportsmanByYear(sportsman.id, year)
                    if(ofp){
                        ofpSum += ofp.ofp
                    }
                    let points = await this.achievementRatingService.getOfpBySportsmanByYear(sportsman.id,year)
                    if(points){
                        pointsSum += points.points
                    }
                }
                ofpSum=ofpSum/club.sportsmen.length
                pointsSum=pointsSum/club.sportsmen.length
            }
            club.rating = ofpSum + pointsSum
        }

        return clubs;
    }

    async getById(id: number): Promise<ClubEntity> {
        let date = new Date()
        let year = date.getFullYear()
        let club = await this.clubRepository.findOne({
            where:{
                id:id
            },
            relations:['trainers','sportsmen']
        })
        if (!club) {
            throw new NotFoundException("No club for this id")
        }
        let ofpSum = 0
        let pointsSum = 0
        if(club.sportsmen && club.sportsmen.length!==0){
            for(let sportsman of club.sportsmen) {
                let ofp = await this.ofpService.getOfpBySportsmanByYear(sportsman.id, year)
                if(ofp){
                    ofpSum += ofp.ofp
                }
                let points = await this.achievementRatingService.getOfpBySportsmanByYear(sportsman.id,year)
                if(points){
                    pointsSum += points.points
                }
            }
            ofpSum=ofpSum/club.sportsmen.length
            pointsSum=pointsSum/club.sportsmen.length
        }
        club.rating = ofpSum + pointsSum
        return club;
    }

    async update(id: number, updateClubDto: UpdateClubDto): Promise<ClubEntity> {
        let club = await this.clubRepository.findOne(id)
        if (!club) {
            throw new HttpException("No club for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            let trainers = []
            for(let item of updateClubDto.trainers) {
                const trainer = await this.usersService.getById(item)
                trainers.push(trainer)
            }
            updateClubDto.trainers = trainers
            Object.assign(club, updateClubDto)
            return await this.clubRepository.save(club)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: number): Promise<void> {
        const club = await this.clubRepository.findOne({id})
        if (!club) {throw new NotFoundException("No club for this id")}
       try {

             await this.clubRepository.delete(club)
        } catch (e){
            throw new BadGatewayException('Deletion didn\'t happen');
        }
    }

    async getRating(id:number){
        let sportsmen = await this.clubRepository.find({
            where:{
                id:id
            },
            relations:['sportsmen']
        })
        let ofpResponse=[]
        let achievementResponse=[]
        for (let sportsman of sportsmen){

            let ofp = await this.ofpService.getBySportsman(sportsman.id,null)
            let points = await this.achievementRatingService.getBySportsman(sportsman.id,null)
            let map1 = ofp.reduce((r, i) => {
                r[i.year] = r[i.year] || []
                    r[i.year].push(i);
                return r;
            }, {});
            let arr1 = [];
            for (let key in map1) {
                arr1.push(map1[key]);
            }
            for (let arr of arr1){
                let s = 0
                let year = 0
                for (let item of arr) {
                    s += item.ofp
                    year = item.year
                }
                let obj = new OfpResponseDto()
                obj.ofp = s/arr.length
                obj.year = year
                ofpResponse.push(obj)
            }

            let map2 = points.reduce((r, i) => {
                r[i.year] = r[i.year] || []
                    r[i.year].push(i);
                return r;
            }, {});
            let arr2 = [];
            for (let key in map2) {
                arr2.push(map2[key]);
            }
            for (let arr of arr2){
                let s = 0
                let year = 0
                for (let item of arr) {
                    s += item.points
                    year = item.year
                }
                let obj = new AchievementRatingResponseDto()
                obj.points = s/arr.length
                obj.year = year
                achievementResponse.push(obj)
            }
        }
      return {
          ofpResponse,
          achievementResponse
      };
    }
}
