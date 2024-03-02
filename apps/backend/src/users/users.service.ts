import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findById(id: number) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      return user;
    } catch (e) {
      this.logger.log(`Cannot find user with id ${id}`, e);
      throw `Cannot find user with id: ${id}`;
    }
  }

  async findByPhoneNumber(phone: string) {
    // We need to sanitize the phone number to remove and '+' characters
    const cleanPhoneNumber = phone.replace(/[+-.]/g, '');
    try {
      const user = await this.userRepo.findOne({
        where: { phone: cleanPhoneNumber },
      });
      return user;
    } catch (e) {
      this.logger.log(`Error finding user with phone ${phone}`, e);
      throw `Cannot find user with phone: ${phone}`;
    }
  }

  async findBySupabaseId(supabaseId: string) {
    return this.userRepo.findOneBy({
      supabaseId,
    });
  }

  async createOrUpdateUserRecord(
    createUserDto: CreateUserDto,
    supabaseUser: SupabaseUser,
  ) {
    try {
      const newUser = await this.userRepo.create({
        supabaseId: supabaseUser?.id,
        email: supabaseUser?.email,
        phone: createUserDto.phone,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
      });
      return await this.userRepo.save(newUser);
    } catch (e) {
      this.logger.log(e);
    }
  }
}
