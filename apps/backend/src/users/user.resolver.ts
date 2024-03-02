import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import {
  GqlCurrentUser,
  GqlSupabaseUser,
} from '../decorators/current-user.decorator';
import { Logger, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../guards/auth.guard';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(() => User)
@UseGuards(AuthenticatedGuard)
export class UserResolver {
  constructor(private readonly userService: UsersService) {}
  private readonly logger = new Logger(UserResolver.name);

  @Query(() => User, { name: 'user' })
  async me(@GqlCurrentUser() user: User) {
    return this.userService.findById(user.id);
  }

  // Todo: Admin only
  @Query(() => [User], { name: 'users' })
  async users() {
    return this.userService.findBySupabaseId('');
  }

  @Mutation(() => User, { name: 'createUser' })
  async createUser(
    @GqlSupabaseUser() supabaseUser: SupabaseUser,
    @GqlCurrentUser() user: User,
    @Args('input') input: CreateUserDto,
  ) {
    if (user) {
      return user;
    }
    try {
      const newUser = await this.userService.createOrUpdateUserRecord(
        {
          firstName: input.firstName,
          lastName: input.lastName,
        },
        supabaseUser,
      );
      return newUser;
    } catch (e) {
      this.logger.log(e);
    }
  }
}
