import {forwardRef, Module} from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import {S3Module} from "../s3/s3.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {NewsEntity} from "./entity/news.entity";

@Module({
  imports:[TypeOrmModule.forFeature([NewsEntity]),
      forwardRef(() => S3Module)],
  controllers: [NewsController],
  providers: [NewsService],
  exports:[NewsService]
})
export class NewsModule {}
