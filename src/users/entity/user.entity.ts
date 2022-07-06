import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  EntityRepository,
  OneToMany,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { RoleEnum } from '../enum/role.enum';
import { User_lobbyEntity } from '../../lobby/entities/user_lobby.entity';
@Entity({
  name: 'user',
})
export class UserEntity {
  @ApiProperty({
    example: '1',
    description: 'An identification number',
  })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({
    example: 'Elon Musk',
    description: 'Username',
  })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: '2022-01-01',
    description: 'Appointment date',
  })
  @Column({
    type: 'date',
    nullable: true,
  })
  appointment_date: string;

  @ApiProperty({
    example: 'Master',
    description: 'Rank',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  rank: string;

  @ApiProperty({
    example: '52-62 kg',
    description: 'Weight category',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  category: string;

  @ApiProperty({
    example: '5',
    description: 'Experience in years',
  })
  @Column({
    type: 'int',
    nullable: true,
  })
  experience: number;

  @ApiProperty({
    example: 'trainer',
    description: 'User role:trainer/judge/secretary',
  })
  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.TRAINER,
  })
  role: RoleEnum;

  @ApiProperty({
    example: 'trainer@gmail.com',
    description: 'User email',
  })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'User password',
  })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  tmp: string;

  @ApiProperty({
    example: `0-Пользователь зарегестрировался,но не подтвердил почту.
    1-Пользователь зарегестрировался,подтвердил почту,ожидает подтверждения админа.
    2-Все подтверждено`,
    description: '1',
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  status: number;
  @ApiProperty()
  @OneToMany(() => User_lobbyEntity, (user_lobby) => user_lobby.user)
  public user_lobby!: User_lobbyEntity[];
}

@EntityRepository(UserEntity)
export class UserRepo extends Repository<UserEntity> {}
