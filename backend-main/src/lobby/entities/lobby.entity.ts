import {
  Column,
  Entity,
  EntityRepository,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from '../../messages/entities/message.entity';
import { UserEntity } from '../../users/entity/user.entity';
import { User_lobbyEntity } from './user_lobby.entity';

@Entity({
  name: 'lobby',
})
export class Lobby {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty()
  @Column()
  name: string;
  @ApiProperty()
  @Column({ nullable: true })
  photo: string;
  @ApiProperty()
  @Column({ nullable: true })
  created_date: Date;
  @ApiProperty()
  @Column({ nullable: true })
  description: string;
  @ApiProperty({ type: () => MessageEntity })
  @OneToMany(() => MessageEntity, (message) => message.lobby, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  messages: MessageEntity[];
  @ApiProperty()
  @Column({ default: false })
  direct: boolean;
  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  authorId: number;
  @ApiProperty()
  @OneToMany(() => User_lobbyEntity, (user_lobby) => user_lobby.lobby)
  public user_lobby!: User_lobbyEntity[];
}
@EntityRepository(Lobby)
export class LobbyRepo extends Repository<Lobby> {}
