import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
    name:"event"
})

export class EventEntity {
    @ApiProperty({
        example: '1',
        description: 'An identification number',
    })
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ApiProperty({
        example: 'Title',
        description: 'Event title',
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    title: string;

    @ApiProperty({
        example: 'Bishkek',
        description: 'Event city',
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    city: string;

    @ApiProperty({
        example: '11.07.2022,9:00',
        })
    @Column({
        type: 'date',
        nullable: false,
    })
    date: Date;

    @ApiProperty({
        example:'9:00-12:00'
        })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    time: string;

    @ApiProperty({
        example:'Seytek'
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    address: string;

    @ApiProperty({
        example:1
        })
    @Column({
        type: 'int',
        nullable: true,
    })
    day: number;

    @ApiProperty({
        example:'July'
        })
    @Column({
        type: 'varchar',
        nullable: true,
    })
    month: string;
}