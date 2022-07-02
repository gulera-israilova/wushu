import { Injectable } from '@nestjs/common';
import { CreateDirectDto } from './dto/create-direct.dto';
import { DirectRepository } from './entities/direct.entity';

@Injectable()
export class DirectService {
  constructor(private readonly repo: DirectRepository) {}
  async create(createDirectDto: CreateDirectDto, userId: number) {

    const direct: CreateDirectDto = {
      authorId: userId,
      partnerId: createDirectDto.partnerId,
      created_date: new Date(),
    };
    return await this.repo.save(direct);
  }

  async findAll() {
    return `This action returns all direct`;
  }

  async remove(id: number) {
    return `This action removes a #${id} direct`;
  }
}
