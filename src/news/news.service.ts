import {BadGatewayException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {getConnection, Repository} from "typeorm";
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
        try {
            if (image) {
                const fileUpload = await this.s3Service.uploadNews(image)
                createNewsDto.image = fileUpload.Location
                createNewsDto.imageKey = fileUpload.Key
            } else createNewsDto.image = null

        } catch (e) {
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST)
        }

        return  await this.newsRepository.save(createNewsDto);
    }

    async get(): Promise<NewsEntity[]> {
        let news = await this.newsRepository.find()
        for (let item of news){
           // @ts-ignore
            item.date = item.date.toLocaleDateString('ru-RU', {
               year: 'numeric',
               month: '2-digit',
               day: '2-digit',
           }) + ' ' + item.date.getHours() + ':' + item.date.getMinutes()
        }
        return news;
    }

    async getById(id: number): Promise<NewsEntity> {
        let news = await this.newsRepository.findOne(id)
        if (!news) {
            throw new NotFoundException("No news for this id")
        }
        // @ts-ignore
        news.date = news.date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }) + ' ' + news.date.getHours() + ':' + news.date.getMinutes()
        return news;
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
            throw new HttpException("Incorrect input data", HttpStatus.BAD_REQUEST);
        }
    }

    async destroy(id: number): Promise<void> {
        const news = await this.newsRepository.findOne({id})
        if (!news) {throw new NotFoundException("No news for this id")}
           try {
            if (news.imageKey) {
                await this.s3Service.deleteFile(news.imageKey)
            }
                await getConnection()
                   .createQueryBuilder()
                   .delete()
                   .from(NewsEntity)
                   .where("id = :id", { id: id })
                   .execute();

               } catch (e){
                throw new BadGatewayException('Deletion didn\'t happen');
            }
        }
 }
