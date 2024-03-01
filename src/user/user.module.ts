import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Conversation } from '~/conversation/entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Conversation])],
  providers: [UserService],
})
export class UserModule {}
