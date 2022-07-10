import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RoleEnum } from '../users/enum/role.enum';

@Injectable()
export class TrainerGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    const user = await this.auth.validate(token);
    try {
      if (!user) return false;
      if (user.role !== RoleEnum.TRAINER)

        request.user = { id: user.id };
      return true;
    } catch (e) {
      throw new UnauthorizedException(e);
    }
  }
}
