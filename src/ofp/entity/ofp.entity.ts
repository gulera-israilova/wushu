import {ApiProperty} from "@nestjs/swagger";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SportsmanEntity} from "../../sportsmen/entity/sportsman.entity";

@Entity({
    name:'ofp'
})
export class OfpEntity {
    @ApiProperty({
        example: '1',
        description: 'An identification number',
    })
    @PrimaryGeneratedColumn({
        type: 'int' ,
    })
    id: number;

    @ApiProperty({
        example: '7.5',
        description: "Ofp",
    })
    @Column({
        type:'real',
        nullable: false,
    })
    ofp:number;

    @ApiProperty({
        example: '2022',
        description: 'Year of ofp',
    })
    @Column({
        type:'int',
        nullable: false,
    })
    year: number;

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