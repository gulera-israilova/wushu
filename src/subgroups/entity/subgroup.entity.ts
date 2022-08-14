import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {EventEntity} from "../../events/entity/event.entity"
import {ArenaEnum} from "../enum/arena.enum";
import {UserEntity} from "../../users/entity/user.entity";
import {ApplicationEntity} from "../../applications/entity/application.entity";
import {SportsmanSubgroupEntity} from "../../sportsmen-subgroups/entity/sportsman-subgroup.entity";

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
    @ApiProperty({
        type: 'string',
    })
    event: EventEntity;

    @OneToMany(() => SportsmanSubgroupEntity, ns => ns.subgroup,{cascade:["insert",'update'],eager:true})
    @ApiProperty({type: SportsmanSubgroupEntity})
    applications: SportsmanSubgroupEntity[]
}