import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ToTestService } from './to-test.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('to-test')
export class ToTestController {
  constructor(private readonly toTestService: ToTestService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@UploadedFile() image: Express.Multer.File) {
    return this.toTestService.create(image);
  }
  @Post('audio')
  @UseInterceptors(FileInterceptor('audio'))
  audio(@UploadedFile() image: Express.Multer.File) {
    return this.toTestService.create(image);
  }
}
