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
import { ChangePasswordDto } from './dto/change-password.dto';
import { Like } from 'typeorm';
import { ForgotDto } from './dto/forgot.dto';
import { ProfileChangePasswordDto } from './dto/profile-change-password.dto';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly cloudinary: CloudinaryService,
    private readonly userRepository: UserRepo,
    private readonly mailService: MailService,
  ) {}


  // Create user wihtout password
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
    if (dto.email === '') throw new BadRequestException('Укажите почту')
    try {
      const register = await this.userRepository.save(dto);
      return await this.mailService.sendMail(
        dto.email,
        `Создайте пароль по этой ссылке ${dto.link}/${register.id}M${tmp}/`,
      ); //При отправке на заполнение пароля мне приходит айди и временный пароль сравниваю и возвращаю булиан
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }


  // Check user tmp
  async checkUser(id, tmp): Promise<string> {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new BadRequestException('Пользователь не найден');
    const matches = await bcrypt.compare(tmp, user.tmp);
    if (!matches) throw new BadRequestException('Пароль введен неверно');
    return `true`;
  }


  // Add password to user
  async addPass(dto: ChangePasswordDto) {
    const user: UserEntity = await this.userRepository.findOne(dto.id);
    if (!user) throw new BadRequestException('Пользователь не найден');
    if (!user.tmp) throw new BadRequestException();
    const match = await bcrypt.compare(dto.tmp, user.tmp);
    console.log(dto.tmp);
    console.log(user.tmp);
    if (!match) throw new BadRequestException('Пароли не совпадают');
    user.tmp = null;
    user.password = await this.hashPass(dto.password);
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
    dto.role = RoleEnum.TRAINER;
    dto.status = 0;
    dto.password = await this.hashPass(dto.password);
    const tmp = await this.genPass();
    dto.tmp = await this.hashPass(tmp);
    try {
      const user = await this.userRepository.save(dto);
      const getName = (name) => {
        const str = name.split('');
        str[str.findIndex((i) => i === '/')] = ' ';
        return str.join('');
      };
      await this.mailService.sendMail(
        dto.email,
        `Здравствуйте уважаемый ${getName(dto.name)}, 
        Для завершения регистрации перейдите по данной ссылке ${dto.link}/${
          user.id
        }M${tmp}/`,
      );
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  // Update user status to 1
  async updateStatus1(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new BadRequestException('Пользователь не найден');
    user.status = 1;
    return await this.userRepository.save(user);
  }

  // Update user status to 2
  async updateStatus2(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new BadRequestException('Пользователь не найден');
    user.status = 2;
    return await this.userRepository.save(user);
  }

  // Update user profile
  async updateProfile(dto: ProfileChangePasswordDto, userId: number) {
    const user = await this.userRepository.findOne(userId);
    const correct = await bcrypt.compare(dto.password, user.password);
    if (!correct) throw new BadRequestException(`Пароль введен неверно`);
    const password = await this.hashPass(dto.password);
    user.password = password;
    return await this.userRepository.save(user);
  }

  //Find users by role and status (Marlen)
  async getByRoleAndStatus(role: RoleEnum, status: number): Promise<UserEntity[]> {
    if (role || status) {
      const statusConfig = () =>  status ? {status} : '';
      const roleConfig = () => role ? {role} : '';

      return await this.userRepository.find({
        where: {
          ...statusConfig(),
          ...roleConfig()
        }
      })
    }
    return await this.userRepository.find();
  }



  // Get by roles (Time)
  async get(page: number, limit: number, role: RoleEnum): Promise<any> {
    const take = limit || 10;
    const skip = page * limit || 0;
    if (role) {
      const [users, total] = await this.userRepository.findAndCount({
        take: take,
        skip: skip,
        where: {
          role: Like(`%${role ? role : ''}%`),
        },
      });
      return {
        data: users,
        total: total,
      };
    } else {
      const [users, total] = await this.userRepository.findAndCount({
        take: take,
        skip: skip,
      });
      return {
        data: users,
        total: total,
      };
    }
  }

  // Forgot password
  async forgotPassword(dto: ForgotDto) {
    const user = await this.userRepository.findOne({ email: dto.email });
    if (!user) throw new BadRequestException('This email is not registered');
    const tmp = await this.genPass();
    user.tmp = await this.hashPass(tmp);
    await this.userRepository.save(user);

    try {
      return await this.mailService.sendMail(
        dto.email,
        `Создайте пароль по этой ссылке ${dto.link}/${user.id}M${tmp}/`,
      );
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }

  // Get user by id
  async getById(id: number) {
    let user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('No user for this id');
    }
    const { password, tmp, ...rest } = user;
    return rest;
  }


  // Update user data
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    photo: Express.Multer.File,
  ): Promise<UserEntity> {
    let user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('No user for this id', HttpStatus.BAD_REQUEST);
    }
    if (photo) {
    const img = await this.cloudinary.upload_file(photo);
    updateUserDto.photo = img.secure_url;
    } else if (!photo) {
      updateUserDto.photo = '';
    }
    const updated = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updated);
  }

  // Delete user
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

  // Find user for validation
  async findForValidation(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new BadRequestException();
    return user;
  }

  // Find one user
  async findOne(options = {}): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: options,
    });
    return user;
  }

  // Hash password
  async hashPass(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  // Generate password
  private async genPass() {
    return generator.generate({ length: 12, numbers: true });
  }
}
