import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {EventEntity} from "../../events/entity/event.entity"
import {ArenaEnum} from "../enum/arena.enum";
import {SportsmanSubgroupEntity} from "../../sportsmen-subgroups/entity/sportsman-subgroup.entity";
import {StatusEnum} from "../enum/status.enum";

@Entity({
    name:'subgroup'
})
export class SubgroupEntity{
    @ApiProperty({
        example:'1',
        description:'Subgroup ID',
    })
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number;

    @ApiProperty({
        example:'Subgroup 1',
        description:'The name of the subgroup',
    })
    @Column({
        type: 'varchar',
        nullable: true,
        unique:true,
    })
    name: string;

    @ApiProperty({
        example:'Girls (10-12 age)',
        description:'Subgroup description',
    })
    @Column({
        type: 'varchar',
        nullable: true,
    })
    description: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: ArenaEnum,
        default: ArenaEnum.SOUTH_NORTH,
    })
    arena: ArenaEnum;


    @ApiProperty()
    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    start_time: Date;

    @ManyToOne(() => EventEntity,
        (event) => event.id,
        {
            eager:false,
            nullable: false,
            cascade:["insert",'update']
        })
    @JoinColumn()
    event: EventEntity;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.PENDING,
    })
    status: StatusEnum;

    @OneToMany(() => SportsmanSubgroupEntity, ns => ns.subgroup,{cascade:["insert",'update'],eager:true})
    @ApiProperty({type: SportsmanSubgroupEntity})
    applications: SportsmanSubgroupEntity[]

    // @Column({
    //     type:'jsonb',
    //     nullable:true
    // })
    // referee_team: object[]
}