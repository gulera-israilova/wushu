import { Module } from '@nestjs/common';
import { DirectService } from './direct.service';
import { DirectGateway } from './direct.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectRepository } from './entities/direct.entity';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([DirectRepository]), AuthModule],
  providers: [DirectGateway, DirectService],
})
export class DirectModule {}
