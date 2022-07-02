import {
  Column,
  Entity,
  EntityRepository,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { UserEntity } from '../../users/entity/user.entity';
import { MessageEntity } from '../../messages/entities/message.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'dialog' })
export class DialogEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany((type) => UserEntity, { cascade: true })
  @JoinTable({
    name: 'user_in_dialog',
    joinColumn: { name: 'dialog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  user: UserEntity[];
  @Column()
  photo: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @ManyToMany((type) => MessageEntity, { cascade: true })
  @JoinTable({
    name: 'messages_in_dialog',
    joinColumn: { name: 'dialog_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'messages_id', referencedColumnName: 'id' },
  })
  messages: MessageEntity[];
  @ApiProperty()
  @Column({ default: new Date() })
  created_date: Date;
}
@EntityRepository(DialogEntity)
export class DialogRepository extends Repository<DialogEntity> {}
