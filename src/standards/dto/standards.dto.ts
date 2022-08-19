import {ApiProperty} from "@nestjs/swagger";
import {CreateStandardDto} from "./create-standard.dto";
import {IsArray, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

export class StandardsDto {
    @ApiProperty({
        example: '1',
        description: "Sportsman id",
    })
    sportsman:number;

    @ApiProperty({type: [CreateStandardDto],required:true})
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateStandardDto)
    standards: CreateStandardDto[]

}