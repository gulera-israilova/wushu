import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty} from "class-validator";

export class CreateDocsDto {

    @ApiProperty({
        example:"https://wushubook.s3.amazonaws.com/reference/pampass.jpg",
        description:'Link to docs',
        required: true,
        format: 'binary',
        type: 'string'
    })
    docs: string;


    @IsEmpty()
    docsKey:string;


    @IsEmpty()
    date: string;

    @IsEmpty()
    size: number;
}