import {Entity, EntityRepository, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { MessageEntity } from '../../messages/entities/message.entity';
import { UserEntity } from '../../users/entity/user.entity';
import {User_lobbyEntity} from "./user_lobby.entity";

@Entity({
  name: 'lobby',
})
export class Lobby {
  @PrimaryGeneratedColumn()
  id: number;
  @ApiProperty({ type: () => MessageEntity })
  @OneToMany(() => MessageEntity, (message) => message.lobby)
  messages: MessageEntity[];
  @ApiProperty()
  @ManyToOne(() => UserEntity, (user) => user.id)
  authorId: number;
  @ApiProperty()
  @OneToMany(
      () => User_lobbyEntity,
      (user_lobby) => user_lobby.lobby,
  )
  public user_lobby!: User_lobbyEntity[];
}
@EntityRepository(Lobby)
export class LobbyRepo extends Repository<Lobby> {}
