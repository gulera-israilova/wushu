import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Repository} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {GenderEnum} from "../enum/gender.enum";
import {ClubEntity} from "../../clubs/entity/club.entity";
import {AchievementEntity} from "../../achievements/entity/achievement.entity";

@Entity({
    name:'sportsman'
})
export class SportsmanEntity {
    @ApiProperty({
        example: '1',
        description: 'An identification number',
    })
    @PrimaryGeneratedColumn({
        type: 'int' ,
    })
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


    // @ApiProperty({ example: 'male', description:"Gender: male/female" })
    // @Column({ type: 'enum', enum: GenderEnum, nullable: false})
    // gender:GenderEnum

    @ApiProperty({
        example: 'male',
        description: 'male/female',
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    gender: string;

    @ApiProperty({
        example: '12',
        description: "Athlete's age",
    })
    @Column({
        type:'int',
        nullable: false,
    })
    age:number;

    @ApiProperty({
        example: 'url',
        description: "Link to health certificate",
    })
    @Column({
        type: "varchar",
        nullable: true,
    })
    reference: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    referenceKey: string;

    @ApiProperty({
        example: 'Master',
        description: 'Rank',
    })
    @Column({ type: 'varchar', nullable: false })
    rank: string;

    @ApiProperty()
    @Column({
        type:'int',
        nullable: true,
    })
    dzi: number;

    @ApiProperty()
    @Column({
        type:'int',
        nullable: true,
    })
    duan: number;

    @ManyToOne((type) => ClubEntity, (club) => club.sportsmen,{ nullable: false,eager:false })
    club: ClubEntity;

    @ApiProperty({
        example: '7.5',
        description: "Ofp",
    })
    @Column({
        type:'real',
        nullable: true,
    })
    ofp:number;

    @ApiProperty({
        example: '7',
        description: "Achievement points",
    })
    @Column({
        type:'real',
        nullable: true,
    })
    points:number;
    // @OneToMany(() => AchievementEntity, (achievement) => achievement.sportsman, {eager:true})
    // @ApiProperty({
    //     type: [AchievementEntity],
    // })
    // achievements: AchievementEntity[]


}




