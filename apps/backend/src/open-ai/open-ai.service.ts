import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { User } from 'users/entities/user.entity';

@Injectable()
export class OpenAiService {
  private readonly openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  private readonly ASSISTANT_ID = 'the assistant id';

  async createNewThread() {
    const thread = await this.openai.beta.threads.create();

    return thread.id;
  }

  async waitForRunToComplete(
    threadId: string,
    run: OpenAI.Beta.Threads.Runs.Run,
  ) {
    if (run.status === 'completed') return;

    const timeout = 1000;
    const timer = setTimeout(async () => {
      run = await this.openai.beta.threads.runs.retrieve(threadId, run.id);
      if (run.status === 'completed') {
        clearTimeout(timer);
        return;
      }
    }, timeout);
  }

  async sendMessage(message: string, user: User, threadId: string) {
    const run = await this.openai.beta.threads.runs.create(threadId, {
      assistant_id: this.ASSISTANT_ID,
    });

    await this.waitForRunToComplete(threadId, run);

    const threadMessages = await this.openai.beta.threads.messages.create(
      threadId,
      { role: 'user', content: message },
    );

    return threadMessages;
  }
}
