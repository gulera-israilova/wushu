import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/services/mail/mail.service';
import { JWT_CONFIG } from '../utils/jwt_config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepo } from '../users/entity/user.entity';
import {UsersService} from "../users/users.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepo]),
    JwtModule.register(JWT_CONFIG),
  ],
  exports: [AuthService, AuthModule],
  controllers: [AuthController],
  providers: [AuthService,UsersService, MailService],
})
export class AuthModule {}
