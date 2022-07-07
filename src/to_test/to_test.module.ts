import { Module } from '@nestjs/common';
import { ToTestService } from './to_test.service';
import { ToTestController } from './to_test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { testRepo } from './entities/to_test.entity';
import { CloudinaryModule } from '../services/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([testRepo]), CloudinaryModule],
  controllers: [ToTestController],
  providers: [ToTestService],
})
export class ToTestModule {}
