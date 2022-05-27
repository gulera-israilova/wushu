import {ApiProperty} from "@nestjs/swagger";
import {RoleEnum} from "../enum/role.enum";

export class UpdateUserDto {
    @ApiProperty({example:'Elon Musk',description:'Username',required:false})
    name: string

    @ApiProperty({example:'2022-01-01',description:'Appointment date',required:false})
    appointment_date: string

    @ApiProperty({example:'Master',description:'Rank',required:false})
    rank: string

    @ApiProperty({example:'52-62 kg',description:'Weight category',required:false})
    category: string

    @ApiProperty({example:'5',description:'Experience in years',required:false})
    experience: number

    @ApiProperty({example:'trainer/judge/secretary',description:'User role',required:false})
    role: RoleEnum

    @ApiProperty({example:'trainer@gmail.com',description:'User email',required:false})
    email: string

    @ApiProperty({example:'password',description:'User password',required:false})
    password: string

    @ApiProperty({example:'0/1',description:'Account activation status'})
    status: boolean
}