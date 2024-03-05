import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'users/entities/user.entity';
import { Conversation } from './entities/conversation.entity';
import { OpenAiService } from 'open-ai/open-ai.service';

@Injectable()
export class ConversationService {
  private readonly logger = new Logger(ConversationService.name);

  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    private openAiService: OpenAiService,
  ) {}

  async findOrCreateConversation(user: User) {
    let conversation: Conversation;

    try {
      // Try to find conversation
      conversation = await this.conversationRepository.findOne({
        where: { user: { id: user.id } },
        relations: ['user'],
      });
      if (!conversation) {
        // Otherwise create a new conversation
        conversation = await this.createConversation(user);
      }

      // Try to find openAiThread
      if (!conversation.openAIThreadId) {
        // Otherwise create a new openAiThread
        const openAiThread = await this.openAiService.createNewThread();

        const newConversation = {
          ...conversation,
          ...{ openAIThreadId: openAiThread },
        };
        await this.conversationRepository.update(
          +conversation.id,
          newConversation,
        );

        return newConversation;
      }

      return conversation;
    } catch (e) {
      this.logger.log(`Cannot find conversation with user ${user}`, e);
      throw `Cannot find conversation with user: ${user}`;
    }
  }

  async createConversation(user: User) {
    try {
      const newConversation = this.conversationRepository.create({
        user: user,
        client: 'sms',
        isActive: true,
      });
      return await this.conversationRepository.save(newConversation);
    } catch (e) {
      this.logger.log(e);
    }
  }
}
