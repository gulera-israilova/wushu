import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import {CloudinaryProvider} from "../../utils/cloudinary.provider";

@Module({
    providers: [CloudinaryProvider, CloudinaryService],
    exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}