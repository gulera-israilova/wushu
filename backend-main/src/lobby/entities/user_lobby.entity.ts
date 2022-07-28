import {
  Column,
  Entity,
  EntityRepository,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
import { Lobby } from './lobby.entity';

@Entity({
  name: 'user_lobby',
})
export class User_lobbyEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  public userId: number;
  @Column()
  public lobbyId: number;
  @ManyToOne(() => UserEntity, (user) => user.user_lobby, {
    onDelete: 'CASCADE',
  })
  public user!: UserEntity;
  @ManyToOne(() => Lobby, (lobby) => lobby.user_lobby)
  public lobby!: Lobby;
}
@EntityRepository(User_lobbyEntity)
export class UserLobbyRepo extends Repository<User_lobbyEntity> {}
