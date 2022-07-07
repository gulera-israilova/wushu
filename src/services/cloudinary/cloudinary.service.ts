import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
  async audio( file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>{
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }

  async get(id): Promise<string | null> {
    try {
      const img = await v2.api.resource(id);
      return img.secure_url;
    } catch (e) {
      return null;
    }
  }

  async delete(id): Promise<void> {
    await v2.api.delete_resources([id]);
  }

  async restore(id): Promise<string> {
    return await v2.api.restore([id]);
  }
}
