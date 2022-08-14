import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {OfpEntity} from "./entity/ofp.entity";
import {StandardsService} from "../standards/standards.service";
import {CreateOfpDto} from "./dto/create-ofp.dto";
import {SportsmenService} from "../sportsmen/sportsmen.service";


@Injectable()
export class OfpService {
    constructor(
        @InjectRepository(OfpEntity)
        private ofpRepository: Repository<OfpEntity>,
        private standardsService: StandardsService,
        private sportsmenService: SportsmenService ) {
    }

    async getOfp(): Promise<OfpEntity[]> {
       let sportsmen = await this.sportsmenService.get()
        for ( let sportsman of sportsmen){
            await this.generateOfp(sportsman.id)
        }
      return await this.ofpRepository.find()
    }

    async getBySportsman(id: number,year:number): Promise<OfpEntity[]> {
        if (year){
            return await this.ofpRepository.find({
                where: {
                    sportsman: id,
                    year: year
                }
            });
        }

        let ofp = await this.ofpRepository.find({
            where: {
                sportsman: id,
            }
        });
        if (ofp.length === 0) {
            throw new NotFoundException("No ofp for this sportsman")
        }
        return ofp;
    }

     async getOfpBySportsmanByYear(id:number,year:number) {
         return await this.ofpRepository.findOne({
            where: {
                sportsman: id,
                year: year,
            }
        });
    }

     async  generateOfp (id:number){
        let date = new Date()
        let year = date.getFullYear()
        let standards = await this.standardsService.getBySportsman(id)
        let map = standards.reduce((r, i) => {
            // @ts-ignore
            r[i.date.substr(0,4)] = r[i.date.substr(0,4)] || [];
            // @ts-ignore
            r[i.date.substr(0,4)].push(i);
            return r;
        }, {});
        let arr1 = [];
        for (let key in map) {
            arr1.push(map[key]);
        }
        for (let arr of arr1){
            let s = 0
            let year = 0
            for (let item of arr){
                s += item.grade
                year = item.date
            }
            let obj = new CreateOfpDto()
            obj.ofp = s/arr.length
            // @ts-ignore
            obj.year = year.substr(0,4)
            obj.sportsman = id
            let sportsman = await this.ofpRepository.findOne({
                where: {
                    sportsman: obj.sportsman,
                    year: obj.year
                }
            })
            if (sportsman) {
                Object.assign(sportsman, obj)
                await this.ofpRepository.save(sportsman)
            } else { // @ts-ignore
                await this.ofpRepository.save(obj)
            }
        }

        let currentOfp = await this.getOfpBySportsmanByYear(id,year)
        await this.sportsmenService.updateOfp(id,currentOfp)
     }

}
