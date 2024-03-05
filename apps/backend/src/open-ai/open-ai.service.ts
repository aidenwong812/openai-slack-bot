import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { User } from 'users/entities/user.entity';

@Injectable()
export class OpenAiService {
  private readonly openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  private readonly ASSISTANT_ID = 'asst_SD7eHjIbdwcHqDsv2NJm1lLX';

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
    await new Promise((resolve) => setTimeout(resolve, timeout));

    // Retrieve the latest status of the run.
    run = await this.openai.beta.threads.runs.retrieve(threadId, run.id);

    // If the run's status is not 'completed', recursively call this method again.
    if (run.status !== 'completed') {
      await this.waitForRunToComplete(threadId, run);
    }
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

    return threadMessages.content.toString();
  }
}
