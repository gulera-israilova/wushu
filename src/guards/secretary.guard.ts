import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RoleEnum } from '../users/enum/role.enum';

@Injectable()
export class SecretaryGuard implements CanActivate {
    constructor(private readonly service: AuthService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        const user = await this.service.validate(token);
        if (!user) return false;
        request.user = user;
        return user.role === RoleEnum.SECRETARY;
    }
}
