import {ApiProperty} from "@nestjs/swagger";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SportsmanEntity} from "../../sportsmen/entity/sportsman.entity";

@Entity({
    name:'achievement-rating'
})
export class AchievementRatingEntity {
    @ApiProperty({
        example: '1',
        description: 'An identification number',
    })
    @PrimaryGeneratedColumn({
        type: 'int' ,
    })
    id: number;

    @ApiProperty({
        example: '7',
        description: "Achievement points",
    })
    @Column({
        type:'real',
        nullable: false,
    })
    points:number;

    @ApiProperty({
        example: '2022',
        description: 'Year of achievement points',
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