import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Matches } from 'class-validator';
import { NAME_REGEX } from '../../utils/regex';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Conversation } from 'conversation/entities/conversation.entity';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Entity()
export class User {
  @Field({ description: 'The id of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'The supabase of the user' })
  @Column({ unique: true })
  supabaseId: string;

  @Field({ description: 'The user role' })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Field({ description: "The user's first name", defaultValue: '' })
  @Column({ nullable: true })
  @Matches(NAME_REGEX)
  firstName: string;

  @Field({ description: "The user's last name", defaultValue: '' })
  @Column({ nullable: true })
  @Matches(NAME_REGEX)
  lastName: string;

  @BeforeInsert()
  capitalizeName() {
    if (this.firstName) {
      this.firstName =
        this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
    }
    if (this.lastName) {
      this.lastName =
        this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);
    }
  }

  @Field({ description: "The user's email address", defaultValue: '' })
  @Column({ nullable: true })
  email: string | undefined | null;

  @BeforeInsert()
  emailToLower() {
    this.email = this.email?.toLowerCase();
  }

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Conversation, (conversation) => conversation.user)
  conversation: Relation<Conversation[]>;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({ default: false })
  termsAgreedTo: boolean;
}
