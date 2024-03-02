import { Injectable, Logger } from '@nestjs/common';
import { TwilioMessageDto } from './dto/twilio-message';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class TwilioService {
  private readonly logger = new Logger(TwilioService.name);

  constructor(private authService: AuthService) {}

  async handleIncomingSMS(twilioData: TwilioMessageDto) {
    try {
      // Find or create user account
      const user = await this.authService.findOrCreateSMSAccount(
        twilioData.From,
      );
      // Process the message via open AI and respond via Twilio

      return;
    } catch (e) {
      this.logger.log('Error handling incoming SMS: ', e);
    }

    return;
  }
}
