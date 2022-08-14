import {
  Column,
  Entity,
  EntityRepository,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from '../../messages/entities/message.entity';

@Entity({ name: 'direct' })
export class DirectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  authorId: number;

  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  partnerId: number;

  @ApiProperty({ type: () => MessageEntity })
  @OneToMany(() => MessageEntity, (message) => message.direct, {
    nullable: true,
  })
  messages: MessageEntity[];
  @Column({ default: new Date() })
  created_date: Date;
}
@EntityRepository(DirectEntity)
export class DirectRepository extends Repository<DirectEntity> {}
