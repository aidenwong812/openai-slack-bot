import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { AuthService } from 'auth/auth.service';
import { ConversationService } from 'conversation/conversation.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, MessageRole } from './entities/message.entity';
import { Repository } from 'typeorm';
import { OpenAiService } from 'open-ai/open-ai.service';

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(
    @InjectRepository(Message)
    private readonly MessageRepository: Repository<Message>,
    private authService: AuthService,
    private conversationService: ConversationService,
    private openAiService: OpenAiService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    try {
      // Find or create user account
      const user = await this.authService.findOrCreateSMSAccount(
        createMessageDto.phone,
      );

      // Find or create conversation
      const conversation =
        await this.conversationService.findOrCreateConversation(user);

      const newMessageFromSMS = this.MessageRepository.create({
        content: createMessageDto.message,
        conversation: conversation,
      });
      await this.MessageRepository.save(newMessageFromSMS);

      const messageFromAi = await this.openAiService.sendMessage(
        createMessageDto.message,
        user,
        conversation.openAIThreadId,
      );
      const newMessageFromSystem = this.MessageRepository.create({
        content: messageFromAi,
        conversation: conversation,
        role: MessageRole.System,
      });
      return await this.MessageRepository.save(newMessageFromSystem);
    } catch (e) {
      this.logger.log('Error handling incoming message: ', e);
    }

    return;
  }

  findAll() {
    return `This action returns all message`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
