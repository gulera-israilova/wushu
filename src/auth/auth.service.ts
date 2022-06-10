import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UserPayload } from '../users/dto/user.payload';
import { UsersService } from '../users/users.service';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.userService.findOne({ email: data.email });
    const isMatch = await bcrypt.compare(data.password, user?.password || '');
    if (!user || !isMatch) {
      throw new BadRequestException('Invalid login or password');
    }
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async validate(token: string) {
    try {
      const payload: any = this.jwtService.decode(token?.split(' ').pop());
      const user = await this.userService.findOne({ id: payload.id });
      return user as UserPayload;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
