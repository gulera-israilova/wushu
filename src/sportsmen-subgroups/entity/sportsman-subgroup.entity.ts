import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {ApplicationEntity} from "../../applications/entity/application.entity";
import {SubgroupEntity} from "../../subgroups/entity/subgroup.entity";

@Entity(
    {name: 'sportsman-subgroup'}
)
export class SportsmanSubgroupEntity{

    @ApiProperty()
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ManyToOne(() => ApplicationEntity,{eager:true})
    @ApiProperty()
    @JoinColumn()
    application: ApplicationEntity

    @ManyToOne(() => SubgroupEntity,{eager:false,cascade: ["insert", "update"]})
    @JoinColumn()
    subgroup: SubgroupEntity

    @ApiProperty()
    @Column({
        type:"varchar",
        nullable:true
    })
    taolu:string

    @ApiProperty()
    @Column({
        type:"real",
        nullable:true
        }
    )
    final_score:number

    @ApiProperty()
    @Column({
        type:"int",
        nullable:true
    })
    place:number

    @ApiProperty()
    @Column({
        type:"real",
        nullable:true
    })
    formula_score:number


    // @ApiProperty()
    // @Column({
    //     type:"jsonb",
    //     nullable:true
    // })
    // referee_team:object[]

}