import {
  Controller,
  Post,
  Body,
  Req,
  Headers,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { TwilioService } from './twilio.service';
import { TwilioMessageDto } from './dto/twilio-message';
import { validateRequest } from 'twilio';
import { FastifyRequest } from 'fastify';

@Controller('twilio')
export class TwilioController {
  private readonly logger = new Logger(TwilioController.name);

  constructor(private readonly twilioService: TwilioService) {}

  @Post()
  async create(
    @Body() params: TwilioMessageDto,
    @Headers('x-twilio-signature') twilioSignature,
    @Req() req: FastifyRequest,
  ) {
    const url = `${req.protocol}://${req.hostname}${req.originalUrl}`;
    // We should first validate the twilio request to ensure it's
    // coming from twilio and not junk/spam
    const isValid = validateRequest(
      process.env.TWILIO_AUTH_TOKEN,
      twilioSignature,
      url,
      params,
    );
    if (!isValid) {
      throw new BadRequestException('Unauthorized');
    }

    return this.twilioService.handleIncomingSMS(params);
  }
}
