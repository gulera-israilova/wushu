import {Column, Entity, EntityRepository, PrimaryGeneratedColumn, Repository} from "typeorm";
import {Lobby} from "../../lobby/entities/lobby.entity";

@Entity({
    name:'to_test'
})
export class ToTest {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    photo:string;
}
@EntityRepository(ToTest)
export class testRepo extends Repository<ToTest> {}