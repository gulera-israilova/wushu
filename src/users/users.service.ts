import {
  BadGatewayException,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity, UserRepo } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateWithoutPasswordDto } from './dto/CreateWithoutPassword.dto';
import { RoleEnum } from './enum/role.enum';
import { MailService } from '../services/mail/mail.service';
import { CreateIndependentDto } from './dto/CreateIndependent.dto';
import * as bcrypt from 'bcryptjs';
import * as generator from 'generate-password';

import { AuthService } from '../auth/auth.service';
import { CheckDto } from './dto/check.dto';
@Injectable()
export class UsersService {
  constructor(
      private readonly userRepository: UserRepo,
      private readonly mailService: MailService,
  ) {}

  async create(createUserDto): Promise<UserEntity> {
    let user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new HttpException(
          'User with this email already exists',
          HttpStatus.BAD_REQUEST,
      );
    }
    createUserDto.status = false;
    try {
      return await this.userRepository.save(createUserDto);
    } catch (e) {
      throw new HttpException('Incorrect input data', HttpStatus.BAD_REQUEST);
    }
  }

  async createWithoutPassword(dto: CreateWithoutPasswordDto) {
    const exist = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (exist)
      throw new BadRequestException(
          `Данная почта ${exist.email} уже была зарегестрирована`,
      );
    if (dto.role === RoleEnum.ADMIN)
      throw new BadRequestException('Администратора нельзя регестрировать');
    if (!Object.values(RoleEnum).includes(dto.role))
      throw new BadRequestException('Роль был введен неверно');
    dto.status = 2;
    const tmp = await this.genPass();
    dto.tmp = await this.hashPass(tmp);
    try {
      const register = await this.userRepository.save(dto);
      return await this.mailService.sendMail(
          dto.email,
          `Создайте пароль по этой ссылке https://www.google.com/${register.id}M${dto.tmp}/`,
      ); //При отправке на заполнение пароля мне приходит айди и временный пароль сравниваю и возвращаю булиан
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  async checkUser(dto: CheckDto) {
    const user = await this.userRepository.findOne(dto.id);
    if (!user) throw new BadRequestException('Пользователь не найден');
    const mathces = await bcrypt.compare(dto.tmp, user.tmp);
    if (!mathces) throw new BadRequestException('Пароль введен неверно');
    return true;
  }

  async addPass(id: number, password: string) {
    const user: UserEntity = await this.userRepository.findOne(id);
    if (!user) throw new BadRequestException('Пользователь не найден');
    user.tmp = null;
    user.password = await this.hashPass(password);
    return await this.userRepository.save(user);
  }

  async createIndependent(dto: CreateIndependentDto) {
    const exist = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (exist)
      throw new BadRequestException(
          `Данная почта ${exist.email} уже была зарегестрирована`,
      );
    if (dto.role !== RoleEnum.TRAINER)
      throw new BadRequestException('Может быть зарегестрирован только Тренер');
    dto.status = 0;
    dto.password = await this.hashPass(dto.password);
    try {
      await this.mailService.sendMail(
          dto.email,
          `Для подтверждения почты перейдите по данной ссылке 'https://www.google.com/'`,
      );
      return await this.userRepository.save(dto);
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
  async updateStatus1(id: number) {
    const user = await this.userRepository.findOne(id);
    user.status = 1;
    return await this.userRepository.save(user);
  }
  async get(page: number, limit: number): Promise<any> {
    const take = limit || 10;
    const skip = page * limit || 0;
    const [users, total] = await this.userRepository.findAndCount({
      take: take,
      skip: skip,
    });
    return {
      data: users,
      total: total,
    };
  }
  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ email: email });
    if(!user)throw new BadRequestException('This email is not registered')
    const tmp = await this.genPass();
    user.tmp = await this.hashPass(tmp);
    try {
      return await this.mailService.sendMail(
          email,
          `Создайте пароль по этой ссылке https://www.google.com/${user.id}M${user.tmp}/`,
      ); //При отправке на заполнение пароля мне приходит айди и временный пароль сравниваю и возвращаю булиан
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
  async getById(id: number): Promise<UserEntity> {
    let user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('No user for this id');
    }
    return this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    let user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('No user for this id', HttpStatus.BAD_REQUEST);
    }
    try {
      Object.assign(user, updateUserDto);
      return await this.userRepository.save(user);
    } catch (e) {
      throw new HttpException('Incorrect input data', HttpStatus.BAD_REQUEST);
    }
  }

  async destroy(id: number): Promise<void> {
    let user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('No user for this id');
    }
    try {
      await this.userRepository.delete(id);
    } catch (e) {
      throw new BadGatewayException("Deletion didn't happen");
    }
  }
  async findOne(options = {}): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: options,
    });
    return user;
  }
  private async hashPass(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
  private async genPass() {
    return generator.generate({ length: 12, numbers: true });
  }
}