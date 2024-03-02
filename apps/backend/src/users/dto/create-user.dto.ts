import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  // Currently blank, but this can be used to create users in the DB once we establish requirements.
  @IsString()
  @Field({ nullable: true })
  firstName?: string;

  @IsString()
  @Field({ nullable: true })
  lastName?: string;

  @IsString()
  @Field({ nullable: true })
  phone?: string;
}
