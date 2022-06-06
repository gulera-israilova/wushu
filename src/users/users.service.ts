import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entity/user.entity";
import {Repository} from "typeorm";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async create(createUserDto):Promise<UserEntity>{
        let user = await this.userRepository.findOne({where: {email: createUserDto.email}})
        if (user) {
            throw new HttpException("User with this email already exists", HttpStatus.BAD_REQUEST)
        }
        createUserDto.status = false
        try {
            return await this.userRepository.save(createUserDto)
        } catch (e){
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST)
        }
    }

    async get(page:number,limit:number) : Promise<any> {
        const take = limit || 10
        const skip = page * limit || 0
        const [users,total] = await this.userRepository.findAndCount({
            take: take,
            skip: skip})
        return {
            data:users,total:total
        }
    }

    async getById(id: number): Promise<UserEntity> {
        let user = await this.userRepository.findOne(id)
        if (!user) {
            throw new NotFoundException("No user for this id")
        }
        return this.userRepository.findOne(id)
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        let user = await this.userRepository.findOne(id)
        if (!user) {
            throw new HttpException("No user for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            Object.assign(user, updateUserDto)
            return await this.userRepository.save(user)
        } catch (e){
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST)
        }
    }

    async destroy(id: number): Promise<void> {
        let user = await this.userRepository.findOne(id)
        if (!user) {
            throw new NotFoundException("No user for this id")
        }
        try {
            await this.userRepository.delete(id)
        } catch (e) {
            throw new BadGatewayException('Deletion didn\'t happen')
        }
    }
}
