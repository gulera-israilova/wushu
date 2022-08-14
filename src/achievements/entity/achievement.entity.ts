import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Repository} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {SportsmanEntity} from "../../sportsmen/entity/sportsman.entity";
import {RankEnum} from "../enum/rank.enum";
import {EventEntity} from "../../events/entity/event.entity";

@Entity({
    name:'achievement'
})
export class AchievementEntity {
    @ApiProperty({
        example: '1',
        description: 'An identification number',
    })
    @PrimaryGeneratedColumn({
        type: 'int' ,
    })
    id: number;

    @ApiProperty({
        example: 'World Championship',
        description: 'Name of the championship',
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    championship: string;

    @ApiProperty({
        example:'A',
        description:'Championship Rank',
    })
    @Column({
        type: 'enum',
        enum: RankEnum,
        default: RankEnum.A,
    })
    rank: RankEnum;

    @ApiProperty({
        description: "Subgroup",
    })
    @Column({
        type:'varchar',
        nullable: false,
    })
    subgroup:string;

    @ApiProperty({
        description: "Category",
    })
    @Column({
        type:'varchar',
        nullable: false,
    })
    category:string;

    @ApiProperty({
        example: '1',
        description: 'Place in the championship',
    })
    @Column({
        type:'int',
        nullable: true,
    })
    place: number;

    @ApiProperty({
        example: '2022',
        description: 'Championship year',
    })
    @Column({
        type:'int',
        nullable: true,
    })
    year: number;

    // @ManyToOne(() => SportsmanEntity, (sportsman) => sportsman.achievements,{ nullable: false })
    // @ApiProperty({
    //     type: SportsmanEntity,
    // })
    // sportsman: SportsmanEntity;

    @ManyToOne(() => SportsmanEntity,
        (sportsman) => sportsman.id,
        {
            eager:false,
            nullable: false,
        })
    @JoinColumn()
    @ApiProperty({
        type: SportsmanEntity,
    })
    sportsman: SportsmanEntity;

}




