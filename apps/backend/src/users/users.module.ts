import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserResolver],
  exports: [UsersService],
})
export class UsersModule {}
