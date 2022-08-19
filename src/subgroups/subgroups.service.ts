import {BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SubgroupEntity} from "./entity/subgroup.entity";
import {ApplicationsService} from "../applications/applications.service";
import {ApplicationEntity} from "../applications/entity/application.entity";
import {SportsmenSubgroupsService} from "../sportsmen-subgroups/sportsmen-subgroups.service";
import {SportsmanSubgroupsDto} from "../sportsmen-subgroups/dto/sportsman-subgroups.dto";
import {ArenaEnum} from "./enum/arena.enum";
import {StatusEnum} from "./enum/status.enum";
import {
    ApproveProtocolDto,
    CreateGradeSportsman,
    CreateRefereeTeamDto,
    CreateSubgroupDto
} from "./dto/create-subgroup.dto";



@Injectable()
export class SubgroupsService {
    constructor(@InjectRepository(SubgroupEntity)
                private subgroupRepository: Repository<SubgroupEntity>,
                private applicationsService: ApplicationsService,
                private sportsmenSubgroupsService:SportsmenSubgroupsService) {
    }

    async formProtocol(id: number): Promise<any> {

        let participants = await this.applicationsService.getByEvent(id)
        let duilian =[]
        let duilianResponse = []
        let quan_shu = []
        let quan_shuResponse = []
        let cisse = []
        let cisseResponse = []
        let tai_chi_quan_shu = []
        let tai_chi_quan_shuResponse = []
        let tai_chi_quan_cisse = []
        let tai_chi_quan_cisseResponse = []
        let response = []
        let subgroups =[]


        for (let participant of participants) {
            if (!(participant.duilian === null || participant.duilian === '')) {
                duilian.push(participant)
            }
        }

        for (let participant of participants) {
            if (!(participant.quanShu === null || participant.quanShu === '')) {
                quan_shu.push(participant)
            }
        }

        for (let participant of participants) {
            if (!(participant.cisse === null || participant.cisse === '')) {
                cisse.push(participant)
            }
        }
        for (let participant of participants) {
            if (!(participant.tai_chi_quan_shu === null || participant.tai_chi_quan_shu === '')) {
                tai_chi_quan_shu.push(participant)
            }
        }

        for (let participant of participants) {
            if (!(participant.tai_chi_quan_cisse === null || participant.tai_chi_quan_cisse === '')) {
                tai_chi_quan_cisse.push(participant)
            }
        }

        if (duilian.length !== 0) {
             duilianResponse = await this.groupByDuilian(duilian)
            for (let item of duilianResponse ){
                if (item.length !== 0)  response.push(item)
            }
        }
        if (quan_shu.length !== 0) {
             quan_shuResponse = await this.groupByQuan_shu(quan_shu)
            for (let item of quan_shuResponse ){
                if (item.length !== 0) response.push(item)
            }
        }

        if (cisse.length !== 0) {
            cisseResponse = await this.groupByCisse(cisse)
            for (let item of cisseResponse ){
                if (item.length !== 0) response.push(item)
            }
        }

        if (tai_chi_quan_shu.length !== 0) {
            tai_chi_quan_shuResponse = await this.groupByTai_chi_quan_shu(tai_chi_quan_shu)
            for (let item of tai_chi_quan_shuResponse ){
                if (item.length !== 0) response.push(item)
            }
        }

        if (tai_chi_quan_cisse.length !== 0) {
            tai_chi_quan_cisseResponse = await this.groupByTai_chi_quan_cisse(tai_chi_quan_cisse)
            for (let item of tai_chi_quan_cisseResponse ){
                if (item.length !== 0)  response.push(item)
            }
        }
        for (let i=0;i<response.length;i++) {
            let createSubgroupDto = new CreateSubgroupDto()
            createSubgroupDto.event = id
            createSubgroupDto.applications = []
            createSubgroupDto.status = StatusEnum.PENDING
            let a = i+1
            createSubgroupDto.name = "Подгруппа " + a
            let s = 0
            let age = 0
            for(let item of response[i]) {
                let sportsmanSubgroupDto = new SportsmanSubgroupsDto()
                sportsmanSubgroupDto.application = item
                createSubgroupDto.applications.push(sportsmanSubgroupDto)
                s += item.performance_duration
                if (item.age >= 8 && item.age < 14){ age = 13}
            }
            let length = response[i].length
            s = s/length
            if (age == 13 && s < 1) createSubgroupDto.arena = ArenaEnum.EAST
            if (age!==13 && s > 1 ) createSubgroupDto.arena = ArenaEnum.SOUTH_NORTH
            if (age!==13 && s < 1 ) createSubgroupDto.arena = ArenaEnum.NORTH

            let checkSubgroupName = await this.subgroupRepository.findOne({
                where:
                    {
                       name:createSubgroupDto.name
                    }
            })
            if(checkSubgroupName){
                let subgroup = await this.update(checkSubgroupName.id,createSubgroupDto)
                subgroups.push(subgroup)
            } else {
                let subgroup = await this.create(createSubgroupDto)
                subgroups.push(subgroup)
            }

        }
        return subgroups;
    }
    async get(id:number){
        return  await this.subgroupRepository.find({
            where:{
                event:id
            }
        })

    }
    async getSubgroup(id:number){
        return await this.subgroupRepository.findOne(id)
    }
     async create(createSubgroupDto:CreateSubgroupDto){

        let newSubgroup

        try {
        // @ts-ignore
            newSubgroup = await this.subgroupRepository.save(createSubgroupDto)
            createSubgroupDto.applications = newSubgroup.applications

        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST)
        }
        try {
        if (createSubgroupDto.applications && createSubgroupDto.applications.length !== 0) {
            for (let e of createSubgroupDto.applications) {
                e.subgroup = newSubgroup.id
                await this.sportsmenSubgroupsService.create(e)
            }
        }
        Object.assign(newSubgroup, createSubgroupDto)
        return await this.subgroupRepository.save(newSubgroup)

        } catch (e) {
            await this.destroy(newSubgroup.id)
            throw new BadRequestException('Wrong composition')
        }

    }

     async update(id: number, updateSubgroupDto: CreateSubgroupDto) {
        let subgroup = await this.subgroupRepository.findOne(id)
        if (!subgroup) {
            throw new HttpException("No subgroup for this id", HttpStatus.BAD_REQUEST)
        }

        if (updateSubgroupDto.applications && updateSubgroupDto.applications.length !== 0) {
            const applications = await this.sportsmenSubgroupsService.get({subgroup: subgroup.id})
                await this.sportsmenSubgroupsService.removeUseless(applications)

            for (const e of updateSubgroupDto.applications) {
                 e.subgroup = subgroup.id
                await this.sportsmenSubgroupsService.create(e);
            }
        }

        Object.assign(subgroup,updateSubgroupDto)
        return await this.subgroupRepository.save(subgroup)
    }

    async createRefereeTeam (id: number, createRefereeTeamDto: CreateRefereeTeamDto) {
        let findSubgroup = await this.subgroupRepository.findOne(id)
        if (!findSubgroup) {
            throw new HttpException("No subgroup for this id", HttpStatus.BAD_REQUEST)
        }
        if (findSubgroup.applications && findSubgroup.applications.length !== 0) {
            const applications = await this.sportsmenSubgroupsService.get({subgroup: findSubgroup.id})
            await this.sportsmenSubgroupsService.removeUseless(applications)

            for (const e of findSubgroup.applications) {
                // @ts-ignore
                e.subgroup = findSubgroup.id
              //  e.referee_team = createRefereeTeamDto.referee_team
                await this.sportsmenSubgroupsService.create(e);
            }
        }

        Object.assign(findSubgroup,createRefereeTeamDto)
        return await this.subgroupRepository.save(findSubgroup)
    }

    async createGradeSportsman (id: number, createGradeSportsman: CreateGradeSportsman) {
        let findSubgroup = await this.subgroupRepository.findOne(id)
        if (!findSubgroup) {
            throw new HttpException("No subgroup for this id", HttpStatus.BAD_REQUEST)
        }
        if (findSubgroup.applications && findSubgroup.applications.length !== 0) {
            const applications = await this.sportsmenSubgroupsService.get({subgroup: findSubgroup.id})
            await this.sportsmenSubgroupsService.removeUseless(applications)

            for (const e of findSubgroup.applications) {
                // @ts-ignore
                e.subgroup = findSubgroup.id
                await this.sportsmenSubgroupsService.create(e);
            }
        }

        Object.assign(findSubgroup,createGradeSportsman)
        return await this.subgroupRepository.save(findSubgroup)
    }

    async approve (id: number, approveProtocolDto: ApproveProtocolDto) {
        let findSubgroups = await this.subgroupRepository.find({
            where:{
                event:id
            }
        })
        for (let subgroup of findSubgroups){
            subgroup.status = approveProtocolDto.status
        }
        if (findSubgroups.length===0) {
            throw new HttpException("No subgroup for this id", HttpStatus.BAD_REQUEST)
        }

        Object.assign(findSubgroups,approveProtocolDto)
        return await this.subgroupRepository.save(findSubgroups)
    }


    async destroy(id: number): Promise<void> {
        const subgroup = await this.subgroupRepository.findOne({id})
        if (!subgroup) {
            throw new HttpException("No subgroup for this id", HttpStatus.BAD_REQUEST)
        }

        try{
            const applications = await this.sportsmenSubgroupsService.get({subgroup: subgroup.id});
            await this.sportsmenSubgroupsService.removeUseless(applications)
            await this.subgroupRepository.delete(id)

        } catch (e){
            throw new BadGatewayException('Deletion didn\'t happen')}
    }

    private async groupByDuilian(data:ApplicationEntity[]){
        let duilianChildren = []
        let duilianAdult = []
        let duilianMale = []
        let duilianFemale = []
        let duilianMale1417 = []
        let duilianMale1839 = []
        let duilianMale4059 = []
        let duilianMale60 = []
        let duilianFemale1417 = []
        let duilianFemale1839 = []
        let duilianFemale4059 = []
        let duilianFemale60 = []
        let response = []
        for (let item of data) {
            if (item.age < 14) {
                duilianChildren.push(item)
            } else duilianAdult.push(item)
        }

        if (duilianAdult.length !== 0) {
            for (let item of duilianAdult) {
                if (item.gender === 'male') {
                    duilianMale.push(item)
                } else duilianFemale.push(item)
            }
        }
        if (duilianMale.length !== 0) {
            for (let item of duilianMale) {
                if (item.age >= 14 && item.age < 18) duilianMale1417.push(item)
                if (item.age >= 18 && item.age < 39) duilianMale1839.push(item)
                if (item.age >= 40 && item.age < 59) duilianMale4059.push(item)
                if (item.age >= 60) duilianMale60.push(item)
            }
        }

        if (duilianFemale.length !== 0) {
            for (let item of duilianFemale) {
                if (item.age >= 14 && item.age < 18) duilianFemale1417.push(item)
                if (item.age >= 18 && item.age < 39) duilianFemale1839.push(item)
                if (item.age >= 40 && item.age < 59) duilianFemale4059.push(item)
                if (item.age >= 60) duilianFemale60.push(item)
            }
        }
        response.push(duilianChildren, duilianMale1417, duilianMale1839, duilianMale4059, duilianMale60, duilianFemale1417, duilianFemale1839, duilianFemale4059,duilianFemale60)
        return response
    }

    private async groupByQuan_shu(data:ApplicationEntity[]){
    let groups = await this.groupByGenderByAge(data)
      for (let group of groups){
          let map = group.reduce((r, i) => {
              r[i.quanShu] = r[i.quanShu] || [];
              r[i.quanShu].push(i);
              return r;
          }, {});
          let arr1 = [];
          for (let key in map) {
              arr1.push(map[key]);
          }
          return arr1
      }
    }

    private async groupByCisse(data:ApplicationEntity[]){
        let groups = await this.groupByGenderByAge(data)
        for (let group of groups) {
                let map = group.reduce((r, i) => {
                    r[i.cisse] = r[i.cisse] || [];
                    r[i.cisse].push(i);
                    return r;
                }, {});
                let arr1 = [];
                for (let key in map) {
                    arr1.push(map[key]);
                }
                return arr1

        }
    }

    private async groupByTai_chi_quan_cisse(data:ApplicationEntity[]){
        let groups = await this.groupByGenderByAge(data)
        for (let group of groups){

                let map = group.reduce((r, i) => {
                    r[i.tai_chi_quan_cisse] = r[i.tai_chi_quan_cisse] || [];
                    r[i.tai_chi_quan_cisse].push(i);
                    return r;
                }, {});
                let arr1 = [];
                for (let key in map) {
                    arr1.push(map[key]);
                }
                return arr1

        }
    }

    private async groupByTai_chi_quan_shu(data:ApplicationEntity[]){
        let groups = await this.groupByGenderByAge(data)
        for (let group of groups){
            let map = group.reduce((r, i) => {
                r[i.tai_chi_quan_shu] = r[i.tai_chi_quan_shu] || [];
                r[i.tai_chi_quan_shu].push(i);
                return r;
            }, {});
            let arr1 = [];
            for (let key in map) {
                arr1.push(map[key]);
            }
            return arr1
        }
    }


    private async groupByGenderByAge(data:ApplicationEntity[]){

        let male = []
        let female = []
        let male810 = []
        let male1113 = []
        let male1417 = []
        let male1839 = []
        let male4059 = []
        let male60 = []
        let female810 = []
        let female1113 = []
        let female1417 = []
        let female1839 = []
        let female4059 = []
        let female60 = []
        let response =[]

        if (data.length !== 0){
            for (let item of data) {
                if (item.gender === 'male') {
                    male.push(item)
                } else female.push(item)
            }
    }

        if (male.length !== 0) {
            for (let item of male) {
                if (item.age >= 8 && item.age < 11) male810.push(item)
                if (item.age >= 11 && item.age < 14) male1113.push(item)
                if (item.age >= 14 && item.age < 18) male1417.push(item)
                if (item.age >= 18 && item.age < 40) male1839.push(item)
                if (item.age >= 40 && item.age < 60) male4059.push(item)
                if (item.age >= 60) male60.push(item)
            }
        }

        if (female.length !== 0) {
            for (let item of female) {
                if (item.age >= 8 && item.age < 11) female810.push(item)
                if (item.age >= 11 && item.age < 14) female1113.push(item)
                if (item.age >= 14 && item.age < 18) female1417.push(item)
                if (item.age >= 18 && item.age < 40) female1839.push(item)
                if (item.age >= 40 && item.age < 60) female4059.push(item)
                if (item.age >= 60) female60.push(item)
            }
        }
        response.push(male810, male1113, male1417, male1839, male4059, male60, female810, female1113,female1417,female1839,female4059,female60)
        let responseWithOutEmptyArray =[]
        for (let arr of response){
            if(arr.length !== 0){
                responseWithOutEmptyArray.push(arr)
            }
        }
        return responseWithOutEmptyArray;

}}