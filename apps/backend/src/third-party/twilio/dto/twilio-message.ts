// The expected shape of data coming from Twilio
export class TwilioMessageDto {
  MessageSid: string;
  Body: string;
  From: string;
  To: string;
}
