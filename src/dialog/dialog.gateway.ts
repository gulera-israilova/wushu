import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { DialogService } from './dialog.service';
import { CreateDialogDto } from './dto/create-dialog.dto';

@WebSocketGateway()
export class DialogGateway {
  constructor(private readonly dialogService: DialogService) {}

  @SubscribeMessage('createDialog')
  create(@MessageBody() createDialogDto: CreateDialogDto) {
    return this.dialogService.create(createDialogDto);
  }

  @SubscribeMessage('findAllDialog')
  findAll() {
    return this.dialogService.findAll();
  }

  @SubscribeMessage('removeDialog')
  remove(@MessageBody() id: number) {
    return this.dialogService.remove(id);
  }
}
