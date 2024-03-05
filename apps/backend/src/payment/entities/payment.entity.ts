import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Payment {
  @Field({ description: 'The id of the payment' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'The name of payer' })
  @Column({ nullable: true })
  name: string;

  @Field({ description: 'The email of payer' })
  @Column({ nullable: true })
  email: string;

  @Field({ description: 'The phone number of payer' })
  @Column({ nullable: true })
  phone: string;

  @Field({ description: 'The amount of the pay' })
  @Column({ nullable: true })
  amount: number;

  @Field({ description: 'The id of stripe subscription' })
  @Column({ nullable: true })
  stripeSubscriptionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
