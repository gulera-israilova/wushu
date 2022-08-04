import { Module } from '@nestjs/common';
import { StandardsController } from './standards.controller';
import { StandardsService } from './standards.service';

@Module({
  controllers: [StandardsController],
  providers: [StandardsService]
})
export class StandardsModule {}
