import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
    name:"calendar"
})

export class CalendarEntity {
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
        nullable: true,
    })
    city: string;

    @ApiProperty({
        example: '11.07.2022',
    })
    @Column({
        type: 'timestamp',
        nullable: false,

    })
    start: Date;

    @ApiProperty({
        example: '13.07.2022',
    })
    @Column({
        type: 'timestamp',
        nullable: true,
    })
    end: Date;

    @ApiProperty({
        example:'9:00-12:00'
    })
    @Column({
        type: 'varchar',
        nullable: true,
    })
    time: string;

    @ApiProperty({})
    @Column({
        type: 'varchar',
        nullable: true,
    })
    display: string;

    @ApiProperty({})
    @Column({
        type: 'varchar',
        nullable: true,
    })
    color: string;

    @ApiProperty({})
    @Column({
        type: 'boolean',
        nullable: true,
    })
    allDay: boolean;

}