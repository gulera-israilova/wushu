import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../../users/entity/user.entity";

@Entity({
    name:'club'
})
export class ClubEntity{
    @ApiProperty({example:'1',description:'Club ID'})
    @PrimaryGeneratedColumn({type: 'int'})
    id: number

    @ApiProperty({example:'Frigate',description:'The name of the club'})
    @Column({type: 'varchar', nullable: false,unique:true})
    name: string

    @ManyToMany(() => UserEntity,{eager:true})
    @JoinTable()
    trainers: UserEntity[]

}