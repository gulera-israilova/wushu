import {
  Column,
  Entity,
  EntityRepository,
  ManyToOne,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';

@Entity({ name: 'direct' })
export class DirectEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => UserEntity, (user) => user.id)
  authorId: number;
  @ManyToOne(() => UserEntity, (user) => user.id)
  partnerId: number;
  @Column({ default: new Date() })
  created_date: Date;
}
@EntityRepository(DirectEntity)
export class DirectRepository extends Repository<DirectEntity> {}
