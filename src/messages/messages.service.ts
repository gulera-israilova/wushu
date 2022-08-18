import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {CreateMessageDto} from './dto/create-message.dto';
import {UpdateMessageDto} from './dto/update-message.dto';
import {MessageRepository} from './entities/message.entity';
import {UserRepo} from '../users/entity/user.entity';
import {MessageStatusEnum} from './enums/message.status.enum';
import {CloudinaryService} from '../services/cloudinary/cloudinary.service';
import {UserLobbyRepo} from '../lobby/entities/user_lobby.entity';
import {ReadDto} from "./dto/Read.dto";

@Injectable()
export class MessagesService {
    constructor(
        private readonly repo: MessageRepository,
        private readonly userRepo: UserRepo,
        private readonly cloudinary: CloudinaryService,
        private readonly lobby_repo: UserLobbyRepo,
    ) {
    }

    async create(
        createMessageDto: CreateMessageDto,
    ) {
        const user = await this.userRepo.findOne(createMessageDto.user);
        if (!user) throw new BadRequestException(`Пользователь не был найден`);
        if (createMessageDto.attachment) {
            console.log(createMessageDto.attachment)
            const photo = await this.cloudinary.upload_file(createMessageDto.attachment).catch((e) => {
                console.log(e)
                throw new BadRequestException('Invalid file type.');
            });
            createMessageDto.attachment = photo.secure_url;
        } else {
            createMessageDto.attachment = null;
        }

        const message = {
            user: user.id,
            text: createMessageDto.text,
            date: new Date(),
            edited: false,
            read: MessageStatusEnum.SENT,
            lobby: createMessageDto.lobby,
            file: createMessageDto.attachment,
        };
        console.log(message)
        return await this.repo.save(message);
    }

    async lastMessage(dto: ReadDto) {
        const lobby = await this.lobby_repo.findOne({
            where: {lobbyId: dto.lobbyId, userId: dto.userId},
        });
        if (!lobby) throw new NotFoundException();
        lobby.last_message = dto.messageId;
        return await this.lobby_repo.save(lobby);
    }

    async update(id: number, updateMessageDto: UpdateMessageDto, userId: number) {
        const message = await this.repo.findOne(id);
        const user = await this.userRepo.findOne(userId);
        if (!message)
            throw new BadRequestException(`Сообщение ${id} не было найдено`);
        if (message.user !== user.id)
            throw new BadRequestException(`Вам не разрешено изменять сообщение`);
        const newMessage: UpdateMessageDto = {
            id: updateMessageDto.id,
            text: updateMessageDto.text,
            edited: updateMessageDto.edited,
            read: updateMessageDto.read,
        };
        Object.assign(message, newMessage);
        return await this.repo.save(message);
    }

    async remove(id: number, userId: number) {
        const message = await this.repo.findOne(id);
        const user = await this.userRepo.findOne(userId);
        if (!user) throw new BadRequestException('Пользователь не найден');
        if (message.user !== user.id)
            throw new BadRequestException(`Вам не разрешено удалять это сообщение`);
        if (!message) throw new BadRequestException(`Сообщение не найдено`);
        await this.repo.delete(id);
    }
}
