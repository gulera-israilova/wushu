import {Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {UserEntity} from "../../users/entity/user.entity";
import {SportsmanEntity} from "../../sportsmen/entity/sportsman.entity";

@Entity({
    name:'club'
})
export class ClubEntity{
    @ApiProperty({
        example:'1',
        description:'Club ID',
    })
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ApiProperty({
        example:'Frigate',
        description:'The name of the club',
    })
    @Column({
        type: 'varchar',
        nullable: false,
        unique:true,
    })
    name: string;

    @ApiProperty({
        type: 'array',
    })
    @ManyToMany(() => UserEntity,{ eager:false })
    @JoinTable()
    trainers: UserEntity[];

    @OneToMany(() => SportsmanEntity, (sportsman) => sportsman.club, {eager:false})
    @ApiProperty({
        type: 'array',
    })
    sportsmen: SportsmanEntity[]

    @ApiProperty()
    @Column({
        type: 'varchar',
        nullable: true,
    })
    options: string;
}