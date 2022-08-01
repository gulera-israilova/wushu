import {ApiProperty} from "@nestjs/swagger";
import {CreateApplicationDto} from "./create-application.dto";
import {IsArray, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class ApplicationDto{
    @ApiProperty({type: [CreateApplicationDto],required:true})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateApplicationDto)
    sportsman: CreateApplicationDto[]
}