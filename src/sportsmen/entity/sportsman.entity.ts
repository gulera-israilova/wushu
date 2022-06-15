import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, Repository} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {GenderEnum} from "../enum/gender.enum";
import {ClubEntity} from "../../clubs/entity/club.entity";

@Entity({
    name:'sportsman'
})
export class SportsmanEntity {
    @ApiProperty({ example: '1', description: 'An identification number' })
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @ApiProperty({ example: 'Elon Musk', description: 'Username' })
    @Column({ type: 'varchar', nullable: false })
    name: string
    //
    // @ApiProperty({ example: 'male', description:"Gender: male/female" })
    // @Column({ type: 'enum', enum: GenderEnum, nullable: false})
    // gender:GenderEnum

    @ApiProperty({ example: 'male', description: 'male/female' })
    @Column({ type: 'varchar', nullable: false })
    gender: string

    @ApiProperty({ example: '12', description: "Athlete's age" })
    @Column({ type:'int', nullable: false })
    age:number

    @ApiProperty({ example: 'url', description: "Link to health certificate" })
    @Column({ type: "varchar", nullable: true })
    reference: string

    @Column({ type: "varchar", nullable: true })
    referenceKey: string

    @ApiProperty({ example: 'Master', description: 'Rank' })
    @Column({ type: 'varchar', nullable: false })
    rank: string

    @ApiProperty()
    @Column({ type:'int', nullable: true })
    dzi: number

    @ApiProperty()
    @Column({ type:'int', nullable: true })
    duan: number

    @ApiProperty()
    @Column({ type:'int', nullable: false })
    agility: number

    @ApiProperty()
    @Column({ type:'int', nullable: false })
    stretching: number

    @ApiProperty()
    @Column({ type:'int', nullable: false })
    power: number

    @ApiProperty()
    @Column({ type:'int', nullable: false })
    speed: number

    @ApiProperty()
    @Column({ type:'int', nullable: false })
    endurance: number

    @ManyToOne(() => ClubEntity, (club) => club.id,{ nullable: true })
    @ApiProperty({ type: ClubEntity })
    club: ClubEntity

    @ApiProperty()
    @Column({ type: "varchar", nullable: true })
    quan_shu: string

    @ApiProperty()
    @Column({ type: "varchar", nullable: true })
    cisse: string

    @ApiProperty()
    @Column({ type: "varchar", nullable: true })
    tai_chi_quan_shu: string

    @ApiProperty()
    @Column({ type: "varchar", nullable: true })
    tai_chi_quan_cisse: string

    @ApiProperty()
    @Column({ type: "varchar", nullable: true })
    duilian: string

    @ApiProperty()
    @Column({ type: "int", nullable: true })
    team_member: string

    @ApiProperty()
    @Column({ type: "int", nullable: true })
    performance_duration: string

    @ApiProperty()
    @Column({ type: "varchar", nullable: true })
    comment: string
}




