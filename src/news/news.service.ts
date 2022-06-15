import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {S3Service} from "../s3/s3.service";
import {NewsEntity} from "./entity/news.entity";
import {UpdateNewsDto} from "./dto/update-news.dto";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(NewsEntity)
        private newsRepository: Repository<NewsEntity>,
        private s3Service: S3Service) {}

    async create(createNewsDto, image): Promise<NewsEntity> {
        let news = await this.newsRepository.findOne({
            where: {
                title: createNewsDto.title
            }
        })
        if (news) {
            throw new HttpException("News with this title already exists", HttpStatus.BAD_REQUEST)
        }
        try {
            if (image) {
                const fileUpload = await this.s3Service.uploadNews(image)
                createNewsDto.image = fileUpload.Location
                createNewsDto.imageKey = fileUpload.Key
            } else createNewsDto.image = null

        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST)
        }

        return  await this.newsRepository.save(createNewsDto)
    }

    async get(): Promise<NewsEntity[]> {
        return await this.newsRepository.find()
    }

    async getById(id: number): Promise<NewsEntity> {
        let news = await this.newsRepository.findOne(id)
        if (!news) {
            throw new NotFoundException("No club for this id")
        }
        return this.newsRepository.findOne(id)
    }

    async update(id: number, updateNewsDto: UpdateNewsDto,image): Promise<NewsEntity> {
        let news = await this.newsRepository.findOne(id)
        if (!news) {
            throw new HttpException("No news for this id", HttpStatus.BAD_REQUEST)
        }
        try {
            if (image) {
                await this.s3Service.deleteFile(news.imageKey)
                const fileUpload = await this.s3Service.uploadNews(image)
                updateNewsDto.image = fileUpload.Location
                updateNewsDto.imageKey = fileUpload.Key
            } else updateNewsDto.image = news.image
            Object.assign(news, updateNewsDto)
            return await this.newsRepository.save(news)
        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST)
        }
    }

    async destroy(id: number): Promise<void> {
        const news = await this.newsRepository.findOne({id})
        if (!news) {throw new NotFoundException("No news for this id")}
       try {
            await this.s3Service.deleteFile(news.imageKey)
            await this.newsRepository.delete(news)

        } catch (e){
            throw new BadGatewayException('Deletion didn\'t happen')}
    }
}
