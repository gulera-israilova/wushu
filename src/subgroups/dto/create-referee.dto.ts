import {ApiProperty} from "@nestjs/swagger";

export class CreateRefereeDto{
    @ApiProperty()
    referee_number:string

    @ApiProperty()
    referee_name:string

    @ApiProperty({required:false})
    grade:number
}
