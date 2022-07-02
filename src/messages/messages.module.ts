import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesGateway } from './messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './entities/message.entity';
import { UserRepo } from '../users/entity/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageRepository, UserRepo]),
    AuthModule,
  ],
  providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
