import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { OpenAiModule } from 'open-ai/open-ai.module';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation]), OpenAiModule],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
