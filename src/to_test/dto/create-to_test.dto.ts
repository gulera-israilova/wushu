import {ApiProperty} from "@nestjs/swagger";

export class CreateToTestDto {
    @ApiProperty()
    photo:string;
}
