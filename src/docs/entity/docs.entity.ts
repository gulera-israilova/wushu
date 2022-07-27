import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
    name:"docs"
})
export class DocsEntity{
    @ApiProperty({
        example: '1',
        description: 'An identification number',
    })
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ApiProperty({
        example: 'https://wushubook.s3.amazonaws.com/reference/pampass.jpg',
        description: "Link to docs",
    })
    @Column({
        type: "varchar",
        nullable: true,
    })
    docs: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        nullable: true,
    })
    docsKey:string;

    @ApiProperty()
    @CreateDateColumn({
        type:'timestamp',
        nullable:false,
    })
    date: Date;

    @ApiProperty()
    @Column({
        type: "int",
        nullable: false,
    })
    size:number;
}