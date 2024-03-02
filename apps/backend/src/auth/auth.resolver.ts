import { Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}
}
