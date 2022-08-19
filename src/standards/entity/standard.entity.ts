import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Repository} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {SportsmanEntity} from "../../sportsmen/entity/sportsman.entity";


@Entity({
   name:'standard'
})
export class StandardEntity {
    @ApiProperty({
        example: '1',
        description: 'An identification number',
    })
    @PrimaryGeneratedColumn({
        type: 'int' ,
    })
    id: number;

    @ApiProperty({
        example: 'Run',
        description: 'Type of standard',
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    type: string;

    @ApiProperty({
        example: '7.5',
        description: "Standard grade",
    })
    @Column({
        type:'real',
        nullable: false,
    })
    grade:number;

    @ApiProperty({
        description: 'Note',
    })
    @Column({
        type:'varchar',
        nullable: true,
    })
    note: string;

    @ApiProperty({
        example: '2022',
        description: 'Date of passing standards',
    })
    @Column({
        type:'date',
        nullable: false,
    })
    date: Date;

    @ManyToOne(() => SportsmanEntity,
        (sportsman) => sportsman.id,
        {
            eager:false,
            nullable: false,
        })
    @ApiProperty(
        {
            example:1,
            description: "Sportsman id"
        }
    )
    @JoinColumn()
    sportsman: SportsmanEntity;
}




