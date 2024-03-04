import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { AuthModule } from 'auth/auth.module';
import { ConversationModule } from 'conversation/conversation.module';
import { Message } from './entities/message.entity';
import { OpenAiModule } from 'open-ai/open-ai.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    AuthModule,
    ConversationModule,
    OpenAiModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
