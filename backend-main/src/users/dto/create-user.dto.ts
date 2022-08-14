import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enum/role.enum';
import { IsEmpty } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({
        example: 'Elon Musk',
        description: 'Username',
        required: true,
    })
    name: string;

    @ApiProperty({
        example: '2022-01-01',
        description: 'Appointment date',
        required: false,
    })
    appointment_date: string;

    @ApiProperty({ example: 'Master', description: 'Rank', required: false })
    rank: string;

    @ApiProperty({
        example: '52-62 kg',
        description: 'Weight category',
        required: false,
    })
    category: string;

    @ApiProperty({
        example: '5',
        description: 'Experience in years',
        required: false,
    })
    experience: number;

    @ApiProperty({
        example: 'trainer',
        description: 'User role:trainer/judge/secretary',
        required: false,
    })
    role: RoleEnum;

    @ApiProperty({
        example: 'trainer@gmail.com',
        description: 'User email',
        required: true,
    })
    email: string;

    @IsEmpty()
    password: string;

    @IsEmpty()
    status: number;
}
