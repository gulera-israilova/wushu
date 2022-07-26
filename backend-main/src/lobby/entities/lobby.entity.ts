import {
  Column,
  Entity,
  EntityRepository,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from '../../messages/entities/message.entity';
import { UserEntity } from '../../users/entity/user.entity';

@Entity({
  name: 'lobby',
})
export class Lobby {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  photo: string;
  @ApiProperty({ type: () => MessageEntity })
  @OneToMany(() => MessageEntity, (message) => message.lobby, {
    nullable: true,
  })
  messages: MessageEntity[];
  @ManyToMany(() => UserEntity, (user) => user.lobby)
  users: UserEntity[];
}
@EntityRepository(Lobby)
export class LobbyRepo extends Repository<Lobby> {}
