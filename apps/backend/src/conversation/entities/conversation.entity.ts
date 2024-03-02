import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'users/entities/user.entity';
import { Message } from 'message/entities/message.entity';

@ObjectType()
@Entity()
export class Conversation {
  @Field({ description: 'The id of the conversation' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'The user of conversation' })
  // @Column({ nullable: true })
  @ManyToOne(() => User, (user) => user.conversation)
  user: Relation<User>;

  @Field({ description: 'The title of the conversation' })
  @Column({ nullable: true })
  client: string;

  @Field({ description: 'The active status of conversation' })
  @Column({ nullable: true })
  isActive: boolean;

  @Field({ description: 'The OpenAI thread associated with this conversation' })
  @Column({ nullable: true })
  openAIThreadId: string;

  @OneToMany(() => Message, (message) => message.id)
  conversation: Relation<Message[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
