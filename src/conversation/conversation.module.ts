import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Module({
  providers: [ConversationService]
})
export class ConversationModule {}
