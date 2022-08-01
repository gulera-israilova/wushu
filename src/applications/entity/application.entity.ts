import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {GenderEnum} from "../enum/gender.enum";
import {EventEntity} from "../../events/entity/event.entity";

@Entity({
    name:"application"
})
export class ApplicationEntity{
    @ApiProperty({
        example: '1',
        description: 'An identification number',
    })
    @PrimaryGeneratedColumn({
        type: 'int',
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

    @ApiProperty({
        example:'male',
        description:'Sportsman gender',
    })
    @Column({
        type: 'enum',
        enum: GenderEnum,
        default: GenderEnum.MALE,
    })
    gender: GenderEnum;

    @ApiProperty({
        example: '12',
        description: "Athlete's age",
    })
    @Column({
        type:'int',
        nullable: false,
    })
    age:number;

    @ApiProperty()
    @Column({
        type:'int',
        nullable: true,
    })
    club: number;

    @ApiProperty()
    @Column({
        type: "varchar",
        nullable: true,
    })
    quan_shu: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        nullable: true,
    })
    cisse: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        nullable: true,
    })
    tai_chi_quan_shu: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        nullable: true,
    })
    tai_chi_quan_cisse: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        nullable: true,
    })
    duilian: string;

    @ApiProperty()
    @Column({
        type: "int",
        nullable: true,
    })
    team_number: number;

    @ApiProperty()
    @Column({
        type: "int",
        nullable: true,
    })
    performance_duration: number;

    @ApiProperty()
    @Column({
        type: "varchar",
        nullable: true,
    })
    level: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        nullable: true,
    })
    comment: string;

    @ManyToOne(() => EventEntity,
        (event) => event.id,
        {
            eager:true,
            nullable: false,
        })
    @JoinColumn()
    @ApiProperty({
        type: 'string',
    })
    event: EventEntity
}