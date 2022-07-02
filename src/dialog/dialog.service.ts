import { Injectable } from '@nestjs/common';
import { CreateDialogDto } from './dto/create-dialog.dto';
import { UpdateDialogDto } from './dto/update-dialog.dto';

@Injectable()
export class DialogService {
  async create(createDialogDto: CreateDialogDto) {
    return 'This action adds a new dialog';
  }

  async findAll() {
    return `This action returns all dialog`;
  }



  async remove(id: number) {
    return `This action removes a #${id} dialog`;
  }
}
