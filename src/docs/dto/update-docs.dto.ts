import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty} from "class-validator";

export class UpdateDocsDto {

    @ApiProperty({
        example:"https://wushubook.s3.amazonaws.com/reference/pampass.jpg",
        description:'Link to docs',
        required: false,
        format: 'binary',
        type: 'string'
    })
    docs: string;

    @IsEmpty()
    docsKey:string;

    @IsEmpty()
    size: number;
}