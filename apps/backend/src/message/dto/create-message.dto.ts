import { Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @Field({ nullable: true })
  phone?: string;

  @IsString()
  @Field({ nullable: true })
  message?: string;
}
