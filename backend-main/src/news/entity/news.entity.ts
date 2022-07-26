import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
    name:"news"
})
export class NewsEntity{
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
        description: 'News title',
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    title: string;

    @ApiProperty({
        example: 'text',
        description: 'News text',
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    text: string;

    @ApiProperty()
    @CreateDateColumn({
        type:'timestamp',
        nullable:false,
    })
    date: Date;

    @ApiProperty({
        example: 'https://wushubook.s3.amazonaws.com/reference/pampass.jpg',
        description: "Link to news image",
    })
    @Column({
        type: "varchar",
        nullable: true,
    })
    image: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    imageKey:string;
}