import {
  Column,
  Entity,
  EntityRepository,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
import { MessageStatusEnum } from '../enums/message.status.enum';
import { DirectEntity } from '../../direct/entities/direct.entity';

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: number;
  @Column({ nullable: true, type: 'text' })
  text: string;
  @Column({ default: new Date() })
  date: Date;
  @Column({ default: false })
  edited: boolean;
  @Column()
  read: MessageStatusEnum;
  @ManyToOne(() => DirectEntity, (direct) => direct.id, { nullable: true })
  @JoinColumn({ name: 'direct_id' })
  direct: number;
  @ManyToOne(() => DirectEntity, (direct) => direct.id, { nullable: true })
  @JoinColumn({ name: 'lobby_id' })
  lobby: number;
  @Column({
    nullable: true,
  })
  attachment: string;
}
@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}
