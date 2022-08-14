import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './entities/message.entity';
import { UserRepo } from '../users/entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../services/cloudinary/cloudinary.module';
import { UserLobbyRepo } from '../lobby/entities/user_lobby.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageRepository, UserRepo, UserLobbyRepo]),
    AuthModule,
    CloudinaryModule,
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
