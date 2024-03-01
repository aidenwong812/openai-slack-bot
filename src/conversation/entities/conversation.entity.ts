import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Relation,
  ManyToOne,
} from 'typeorm';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../auth/decorators/role.decorator';
import { User } from '~/user/entities/user.entity';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.conversation)
  user: Relation<User>;

  @IsNotEmpty()
  @Column()
  client: string;

  @IsNotEmpty()
  @IsBoolean()
  @Column()
  isActive: boolean;

  @IsString()
  @Column()
  openAIThreadId: string;

  @Column({ default: Role.USER })
  role: number;

  @Column({ default: false })
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
