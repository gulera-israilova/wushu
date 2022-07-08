import { Module } from '@nestjs/common';
import { ToTestService } from './to-test.service';
import { ToTestController } from './to-test.controller';
import {CloudinaryModule} from "../services/cloudinary/cloudinary.module";

@Module({
  imports:[CloudinaryModule],
  controllers: [ToTestController],
  providers: [ToTestService]
})
export class ToTestModule {}
