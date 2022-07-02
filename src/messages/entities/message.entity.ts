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

@Entity({ name: 'message' })
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: number;
  @ApiProperty()
  @Column({ nullable: false, type: 'text' })
  message: string;
  @ApiProperty()
  @Column({ default: new Date() })
  date: Date;
  @Column({ default: false })
  edited: boolean;
}
@EntityRepository(MessageEntity)
export class MessageRepository extends Repository<MessageEntity> {}
