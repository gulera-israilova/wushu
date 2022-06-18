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
        example: 'title',
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

    @ApiProperty()
    @Column({
        type: 'date',
        nullable: false,
    })
    date: Date;
}