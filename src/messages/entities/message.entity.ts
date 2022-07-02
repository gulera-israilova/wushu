import {
  Column,
  Entity,
  EntityRepository,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
import { ClubEntity } from '../../clubs/entity/club.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MessageStatusEnum } from '../enums/message.status.enum';
import { DirectEntity } from '../../direct/entities/direct.entity';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: number;
  @Column({ nullable: false, type: 'text' })
  text: string;
  @Column({ default: new Date() })
  date: Date;
  @Column({ default: false })
  edited: boolean;
  @Column()
  read: MessageStatusEnum;
  @ManyToOne(() => DirectEntity, (direct) => direct.id)
  directId: number;
  // @Column()
  // attachment: string; add photo and audio
}
@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}
