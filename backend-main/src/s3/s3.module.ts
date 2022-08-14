import {forwardRef, Module} from '@nestjs/common';
import { S3Controller } from './s3.controller';
import { S3Service } from './s3.service';
import {SportsmenModule} from "../sportsmen/sportsmen.module";
import {NewsModule} from "../news/news.module";

@Module({
  imports:[forwardRef(() => SportsmenModule),
    forwardRef(() => NewsModule)],
  controllers: [S3Controller],
  providers: [S3Service],
  exports: [S3Service]
})
export class S3Module {}
