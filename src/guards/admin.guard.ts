import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RoleEnum } from '../users/enum/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    const user = await this.auth.validate(token);
    try {
      if (!user || user.role !== RoleEnum.ADMIN) return false;
      request.user = { id: user.id };
      return true;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
