import {forwardRef, Module} from '@nestjs/common';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NewsEntity} from "../news/entity/news.entity";
import {S3Module} from "../s3/s3.module";
import {DocsEntity} from "./entity/docs.entity";

@Module({
  imports:[TypeOrmModule.forFeature([DocsEntity]),
    forwardRef(() => S3Module)],
  controllers: [DocsController],
  providers: [DocsService],
  exports:[DocsService],
})
export class DocsModule {}
