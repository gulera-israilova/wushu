import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepo } from './entity/user.entity';
import { ClubsModule } from '../clubs/clubs.module';
import { AuthModule } from '../auth/auth.module';
import { MailService } from '../services/mail/mail.service';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';
import {CloudinaryModule} from "../services/cloudinary/cloudinary.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepo]),
    forwardRef(() => ClubsModule),
    AuthModule,

  ],
  controllers: [UsersController],
  providers: [UsersService, MailService, CloudinaryService],
  exports: [UsersService],
})
export class UsersModule {}
