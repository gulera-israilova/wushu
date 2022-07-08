import {BadRequestException, Injectable} from '@nestjs/common';
import {CloudinaryService} from "../services/cloudinary/cloudinary.service";

@Injectable()
export class ToTestService {
constructor(private readonly cloudinary:CloudinaryService) {
}
  async create(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch((e) => {
      throw new BadRequestException(e,'Invalid file type.');
    });
  }
  async audio(file: Express.Multer.File) {
    return await this.cloudinary.audio(file).catch((e) => {
      throw new BadRequestException(e,'Invalid file type.');
    });
  }
}
