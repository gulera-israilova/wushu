import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';

@Injectable()
export class ToTestService {
  constructor(private readonly cloudinary: CloudinaryService) {}
  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
}
