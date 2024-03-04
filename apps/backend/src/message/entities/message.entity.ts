import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Conversation } from 'conversation/entities/conversation.entity';

export enum MessageRole {
  System = 'system',
  User = 'user',
}

registerEnumType(MessageRole, {
  name: 'MessageRole',
});

@ObjectType()
@Entity()
export class Message {
  @Field({ description: 'The id of the message' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'The user of conversation' })
  @ManyToOne(() => Conversation, (conversation) => conversation.id)
  conversation: Relation<Conversation>;

  @Field({ description: 'The content of the message' })
  @Column({ nullable: true })
  content: string;

  @Field({ description: 'The user role' })
  @Column({
    type: 'enum',
    enum: MessageRole,
    default: MessageRole.User,
  })
  role: MessageRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
