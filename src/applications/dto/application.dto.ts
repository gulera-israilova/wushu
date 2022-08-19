import {ApiProperty} from "@nestjs/swagger";
import {CreateApplicationDto} from "./create-application.dto";
import {IsArray, IsEmpty, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class ApplicationDto{

    @ApiProperty({
        example: '1',
        description: 'Event id',
        required: true,
    })
    event: number;

    @ApiProperty({type: [CreateApplicationDto],required:true})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateApplicationDto)
    sportsmen: CreateApplicationDto[]

    @IsEmpty()
    createDate: string;
}