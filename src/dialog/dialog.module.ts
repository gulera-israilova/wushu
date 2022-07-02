import { Module } from '@nestjs/common';
import { DialogService } from './dialog.service';
import { DialogGateway } from './dialog.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DialogRepository } from './entities/dialog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DialogRepository])],
  providers: [DialogGateway, DialogService],
})
export class DialogModule {}
