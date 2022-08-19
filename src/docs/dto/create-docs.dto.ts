import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty} from "class-validator";

export class CreateDocsDto {

    @ApiProperty({
        example:"https://wushubook.s3.amazonaws.com/document.pdf",
        description:'Link to document',
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