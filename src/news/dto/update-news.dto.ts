import {ApiProperty} from "@nestjs/swagger";
import {IsEmpty} from "class-validator";


export class UpdateNewsDto{
    @ApiProperty({
        example: 'title',
        description: 'News title',
        required: true,
    })
    title: string;

    @ApiProperty({
        example: 'text',
        description: 'News text',
        required: true,
    })
    text: string;

    @ApiProperty({
        example:"https://wushubook.s3.amazonaws.com/reference/pampass.jpg",
        description:'Link to news image: jpg/jpeg/png/svg/bmp/doc/docs/pdf/txt/cdr/djvu/psd/csv',
        required: false,
        format: 'binary',
        type: 'string',
    })
    image: string;

    @IsEmpty()
    imageKey:string;
}