import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {EventEntity} from "../../events/entity/event.entity";

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
        nullable: false,
        unique:true,
    })
    name: string;

    @ApiProperty({
        example:'Girls (10-12 age)',
        description:'Subgroup description',
    })
    @Column({
        type: 'varchar',
        nullable: false,
    })
    description: string;

    @ApiProperty()
    @Column({
        type: "varchar",
        nullable: true,
    })
    arena: string;

    @ApiProperty()
    @Column({
        type: 'date',
        nullable: false,
    })
    start_time: Date;

    @ManyToOne(() => EventEntity,
        (event) => event.id,
        {
            eager:true,
            nullable: false,
        })
    @JoinColumn()
    @ApiProperty({
        type: 'string',
    })
    event: EventEntity;

}