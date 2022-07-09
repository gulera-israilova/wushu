import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UserPayload extends PickType(CreateUserDto, [
  'name' as const,
  'email' as const,
  'role' as const,
]) {}
