import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ClubEntity} from "./entity/club.entity";
import {Repository} from "typeorm";
import {UsersService} from "../users/users.service";
import {UpdateClubDto} from "./dto/update-club.dto";
import {RoleEnum} from "../users/enum/role.enum";


@Injectable()
export class ClubsService {
    constructor(@InjectRepository(ClubEntity)
                private clubRepository:Repository<ClubEntity>,
                private usersService:UsersService) {}


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
        return await this.clubRepository.find({})
    }

    async getById(id: number): Promise<ClubEntity> {
        let club = await this.clubRepository.findOne(id)
        if (!club) {
            throw new NotFoundException("No club for this id")
        }
        return this.clubRepository.findOne(id);
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
        try{
            await this.clubRepository.delete(club)
        } catch (e){
            throw new BadGatewayException('Deletion didn\'t happen');
        }
    }
}
