import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_CONFIG } from '../utils/jwt_config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepo } from '../users/entity/user.entity';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { MailService } from '../services/mail/mail.service';
import { CloudinaryModule } from '../services/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepo]),
    JwtModule.register(JWT_CONFIG),
    CloudinaryModule,
  ],
  exports: [AuthService, AuthModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, MailService],
})
export class AuthModule {}
