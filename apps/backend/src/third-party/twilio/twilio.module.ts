import { Module } from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioController } from './twilio.controller';
import { AuthModule } from '../../auth/auth.module';

@Module({
  controllers: [TwilioController],
  providers: [TwilioService],
  imports: [AuthModule],
})
export class TwilioModule {}
