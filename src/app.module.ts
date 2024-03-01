import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [ConversationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
