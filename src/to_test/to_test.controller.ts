import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ToTestService } from './to_test.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('to-test')
export class ToTestController {
  constructor(private readonly toTestService: ToTestService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.toTestService.uploadImageToCloudinary(file);
  }


}
