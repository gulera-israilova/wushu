import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDirectDto } from './dto/create-direct.dto';
import { DirectRepository } from './entities/direct.entity';
import { UserRepo } from '../users/entity/user.entity';

@Injectable()
export class DirectService {
  constructor(
    private readonly repo: DirectRepository,
    private readonly userRepo: UserRepo,
  ) {}
  async create(createDirectDto: CreateDirectDto, userId: number) {
    const partner = await this.userRepo.findOne(createDirectDto.partnerId);
    if (!partner)
      throw new BadRequestException('Данный пользователь не существует');

    const chat = await this.repo.findOne({
      authorId: userId,
      partnerId: createDirectDto.partnerId,
    });
    if (chat) throw new BadRequestException(`Данный чат уже существует`);

    const chatAsPartner = await this.repo.findOne({
      authorId: createDirectDto.partnerId,
      partnerId: userId,
    });
    if (chatAsPartner)
      throw new BadRequestException(`Данный чат уже существует`);

    const direct: CreateDirectDto = {
      authorId: userId,
      partnerId: createDirectDto.partnerId,
      created_date: new Date(),
    };

    return await this.repo.save(direct);
  }
  async findAll(userId: number): Promise<any> {
    const directs = await this.repo.find({
      where: [{ authorId: userId }, { partnerId: userId }],
      relations: ['authorId', 'partnerId', 'messages'],
    });
    const response = await Promise.all(
      directs.map(async (e) => {
        const res = {};
        res['direct_id'] = e.id;
        res['author.id'] = e.authorId['id'];
        res['author.name'] = e.authorId['name'];
        res['author.photo'] = e.authorId['photo'];
        res['partner.id'] = e.partnerId['id'];
        res['partner.name'] = e.partnerId['name'];
        res['partner.photo'] = e.partnerId['photo'];
        res['last_message'] = await this.lastMessage(e.id);
        return res;
      }),
    );
    return response;
  }

  async remove(id: number) {
    const direct = await this.repo.findOne(id);
    if (!direct)
      throw new BadRequestException(`Данное айди не действительное `);
    await this.repo.delete(id);
  }
  private async lastMessage(id: number): Promise<string> {
    const lastMessage: string = await this.repo.query(`
         select * from public.message 
         WHERE direct_id = ${id}
         ORDER BY id DESC LIMIT 1
    `);
    return lastMessage;
  }
}
