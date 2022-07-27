import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UserPayload } from '../users/dto/user.payload';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly auth: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userService.findOne({ email: data.email });
    const isMatch = await bcrypt.compare(data.password, user?.password || '');
    if (!user || !isMatch) {
      throw new BadRequestException('Invalid login or password');
    }
    if (user.status === 0)
      throw new BadRequestException(`Подтвердите пожалуйста свою почту`);
    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      country: user.country,
      city: user.city,
      role: user.role,
      image: user.photo,
      status: user.status,
    };

    const token = this.auth.sign(payload);
    return { token };
  }

  async validate(token: string): Promise<UserEntity> {
    try {
      const payload: any = this.auth.decode(token?.split(' ')[1]);
      if (payload === null) throw new UnauthorizedException();
      const user = await this.userService.findForValidation(payload.id);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
