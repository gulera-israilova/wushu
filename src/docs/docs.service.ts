import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {getConnection, Repository} from "typeorm";
import {S3Service} from "../s3/s3.service";
import {DocsEntity} from "./entity/docs.entity";
import {InjectRepository} from "@nestjs/typeorm";;
import {UpdateDocsDto} from "./dto/update-docs.dto";
import {CreateDocsDto} from "./dto/create-docs.dto";

@Injectable()
export class DocsService {
    constructor(
        @InjectRepository(DocsEntity)
    private docsRepository: Repository<DocsEntity>,
    private s3Service: S3Service) {}

    async create(createDocsDto, docs): Promise<{ success: boolean; description: any; status: number }> {
        try {
            const fileUpload = await this.s3Service.uploadDocs(docs)
            createDocsDto.docs = fileUpload.Location
            createDocsDto.docsKey = fileUpload.Key
            const getFile = await this.s3Service.getFile(fileUpload.Key)
            createDocsDto.size = getFile.ContentLength
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST)
        }
        await this.docsRepository.save(createDocsDto)
        return {
            status: 201,
            success: true,
            description: "The created document has been successfully saved to the database"
        };
    }

    async get(): Promise<DocsEntity[]> {
        let docs = await this.docsRepository.find()
        for (let item of docs ) {
            item.size = await this.conv_size(item.size)
        }
        return docs;
    }

    async getById(id: number): Promise<DocsEntity> {
        let news = await this.docsRepository.findOne(id)
        if (!news) {
            throw new NotFoundException("No news for this id")
        }
        news.size = await this.conv_size(news.size)
        return news;
    }

    async update(id: number, updateDocsDto: UpdateDocsDto,docs): Promise<{ success: boolean; description: string; status: number }> {
        let news = await this.docsRepository.findOne(id)
        if (!news) {
            throw new HttpException("No news for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            if (docs) {
                await this.s3Service.deleteFile(news.docsKey)
                const fileUpload = await this.s3Service.uploadDocs(docs)
                updateDocsDto.docs = fileUpload.Location
                updateDocsDto.docsKey = fileUpload.Key
            } else updateDocsDto.docs = news.docs
            Object.assign(news, updateDocsDto)
            await this.docsRepository.save(news)
            return {
                status: 201,
                success: true,
                description: "The updated document has been successfully saved to the database"
            };
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: number): Promise<void> {
        const news = await this.docsRepository.findOne({id})
        if (!news) {throw new NotFoundException("No news for this id")}
        try {
            if (news.docsKey) {
                await this.s3Service.deleteFile(news.docsKey)
            }
            await getConnection()
                .createQueryBuilder()
                .delete()
                .from(DocsEntity)
                .where("id = :id", { id: id })
                .execute();

        } catch (e){
            throw new BadGatewayException('Deletion didn\'t happen');
        }
    }
    async conv_size(b){
        let fileSizeKb
        let fileSizeMb
        let fileSizeGb
        let fileSizeTb
        let fileSize

        fileSizeKb = b / 1024;
        fileSizeMb = fileSizeKb / 1024;
        fileSizeGb = fileSizeMb / 1024;
        fileSizeTb = fileSizeGb / 1024;

        if (fileSizeKb <= 1024) {
            fileSize = Math.round(fileSizeKb) + ' кб';
        } else if (fileSizeKb >= 1024 && fileSizeMb <= 1024) {
            fileSize = Math.round(fileSizeMb) + ' мб';
        } else if (fileSizeMb >= 1024 && fileSizeGb <= 1024) {
            fileSize =  Math.round(fileSizeGb) + ' гб';
        } else {
            fileSize =  Math.round(fileSizeTb) + ' тб';
        }
        return fileSize;
    }

}
