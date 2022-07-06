import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDirectDto } from './dto/create-direct.dto';
import { DirectEntity, DirectRepository } from './entities/direct.entity';

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

  async findAll(userId: number): Promise<DirectEntity[]> {
    return await this.repo.find({
      where: [{ authorId: userId }, { partnerId: userId }],
    });
  }

  async remove(id: number) {
    const direct = await this.repo.findOne(id, { relations: ['messages'] });
    if (!direct)
      throw new BadRequestException(`Данное айди не действительное `);
    await this.repo.delete(id);
  }
}
