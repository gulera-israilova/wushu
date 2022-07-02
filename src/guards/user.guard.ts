import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly service: AuthService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers['authorization'];
        const user = await this.service.validate(token);
        if (!user) {
            return false;
        }
        request.user = user;
        return true
    }
}