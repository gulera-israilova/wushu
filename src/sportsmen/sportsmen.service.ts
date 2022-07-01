import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {SportsmanEntity} from "./entity/sportsman.entity";
import {S3Service} from "../s3/s3.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UpdateSportsmanDto} from "./dto/update-sportsman.dto";


@Injectable()
export class SportsmenService {
    constructor(
        @InjectRepository(SportsmanEntity)
        private sportsmanRepository: Repository<SportsmanEntity>,
        private s3Service: S3Service) {
    }

    async create(createSportsmanDto, reference): Promise<SportsmanEntity> {
        let sportsman = await this.sportsmanRepository.findOne({
            where: {
                name: createSportsmanDto.name
            }
        })
        if (sportsman) {
            throw new HttpException("Sportsman with this name already exists", HttpStatus.BAD_REQUEST)
        }
        try {
            createSportsmanDto = await this.checkSportsmanDto(createSportsmanDto)
            if (reference) {
                const fileUpload = await this.s3Service.uploadReference(reference)
                createSportsmanDto.reference = fileUpload.Location
                createSportsmanDto.referenceKey = fileUpload.Key
            } else createSportsmanDto.reference = null

            } catch (e) {
                throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST)
            }

        return  await this.sportsmanRepository.save(createSportsmanDto);
    }

    async get(): Promise<SportsmanEntity[]> {
        return await this.sportsmanRepository.find();
    }

    async getById(id: number): Promise<SportsmanEntity> {
        let sportsman = await this.sportsmanRepository.findOne(id)
        if (!sportsman) {
            throw new NotFoundException("No sportsman for this id")
        }
        return sportsman;
    }

    async getByClub(id: number): Promise<SportsmanEntity[]> {
        return await this.sportsmanRepository.find({
            where: {
                club: id,
            }
        });
    }

    async update(id: number, updateSportsmanDto: UpdateSportsmanDto,reference): Promise<SportsmanEntity> {
        let sportsman = await this.sportsmanRepository.findOne(id)
        if (!sportsman) {
            throw new HttpException("No sportsman for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            updateSportsmanDto = await this.checkSportsmanDto(updateSportsmanDto)
            if (reference) {
                await this.s3Service.deleteFile(sportsman.referenceKey)
                const fileUpload = await this.s3Service.uploadReference(reference)
                updateSportsmanDto.reference = fileUpload.Location
                updateSportsmanDto.referenceKey = fileUpload.Key
            } else updateSportsmanDto.reference = sportsman.reference
            Object.assign(sportsman, updateSportsmanDto)
            return await this.sportsmanRepository.save(sportsman)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: number): Promise<void> {
        const sportsman = await this.sportsmanRepository.findOne(id)
        if (!sportsman) {throw new NotFoundException("No sportsman for this id")}
        try{
            await this.s3Service.deleteFile(sportsman.referenceKey)
            await this.sportsmanRepository.delete(sportsman)

        } catch (e){
            throw new BadGatewayException('Deletion didn\'t happen');
        }
    }

    async checkSportsmanDto(createSportsmanDto: any) {
        if (typeof createSportsmanDto.age === 'string' && createSportsmanDto.age !== '') createSportsmanDto.age = +createSportsmanDto.age
        if (typeof createSportsmanDto.club === 'string' && createSportsmanDto.club !== '') createSportsmanDto.club = +createSportsmanDto.club
        if (typeof createSportsmanDto.club === 'string' && createSportsmanDto.club === '') createSportsmanDto.club = null
        if (typeof createSportsmanDto.dzi === 'string' && createSportsmanDto.dzi !== '') createSportsmanDto.dzi = +createSportsmanDto.dzi
        if (typeof createSportsmanDto.dzi === 'string' && createSportsmanDto.dzi === '') createSportsmanDto.dzi = 0
        if (typeof createSportsmanDto.duan === 'string' && createSportsmanDto.duan !== '') createSportsmanDto.duan = +createSportsmanDto.duan
        if (typeof createSportsmanDto.duan === 'string' && createSportsmanDto.duan === '') createSportsmanDto.duan = 0
        if (typeof createSportsmanDto.agility === 'string' && createSportsmanDto.agility !== '') createSportsmanDto.agility = +createSportsmanDto.agility
        if (typeof createSportsmanDto.stretching === 'string' && createSportsmanDto.stretching !== '') createSportsmanDto.stretching = +createSportsmanDto.stretching
        if (typeof createSportsmanDto.power === 'string' && createSportsmanDto.power !== '') createSportsmanDto.power = +createSportsmanDto.power
        if (typeof createSportsmanDto.speed === 'string' && createSportsmanDto.speed !== '') createSportsmanDto.speed = +createSportsmanDto.speed
        if (typeof createSportsmanDto.endurance === 'string' && createSportsmanDto.endurance !== '') createSportsmanDto.endurance = +createSportsmanDto.endurance
        return createSportsmanDto;
        }
    }


