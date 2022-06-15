import {BadRequestException, Injectable} from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    AWS_S3_BUCKET_REFERENCE = process.env.AWS_S3_BUCKET_REFERENCE;
    AWS_S3_BUCKET_NEWS = process.env.AWS_S3_BUCKET_NEWS
    s3 = new AWS.S3
    ({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_KEY_SECRET,
    });

    async uploadReference(file) {
        const { originalname } = file;
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET_REFERENCE, originalname, file.mimetype);
    }

    async uploadNews(file) {
        const { originalName } = file;
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET_NEWS, originalName, file.mimetype);
    }

    async s3_upload(file, bucket, name, mimetype) {
        const params =
            {
                Bucket: bucket,
                Key: String(name),
                Body: file,
                ACL: "public-read",
                ContentType: mimetype,
                ContentDisposition:"inline",
                CreateBucketConfiguration: {
                        LocationConstraint: "ap-south-1"
                    }
            };

        try {
            let s3Response = await this.s3.upload(params).promise();
            return (s3Response);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    async deleteFile(key:string) {
        await this.s3_delete( this.AWS_S3_BUCKET, key);
    }

    async s3_delete (bucket,key){
        const params =
            {
                Bucket: bucket,
                Key: key
            }
            try {
                let s3Response = await this.s3.deleteObject(params).promise();

            } catch (e){
                throw new BadRequestException(e.message);
            }

    }
}
