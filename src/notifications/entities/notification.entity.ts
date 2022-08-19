import {Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../../users/entity/user.entity";

@Entity({
    name: 'notification'
})
export class Notification {

    @ApiProperty({
        example: '1',
        description: 'Notifications ID',
    })
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;


    @ApiProperty({
        type: 'array',
    })
    @ManyToMany(() => UserEntity, {eager: false, cascade:true})
    @JoinTable()
    user: UserEntity[];

}
