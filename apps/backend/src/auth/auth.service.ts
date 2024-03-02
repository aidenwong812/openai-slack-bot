import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { SupabaseService } from '../third-party/supabase/supabase.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UsersService,
    private supabaseService: SupabaseService,
  ) {}

  async validateUser(req: Request) {
    const token = req.headers?.authorization;
    const supabaseUser = await this.supabaseService.verifyToken(token);
    const dbUser = await this.userService.findBySupabaseId(supabaseUser.id);
    return {
      dbUser,
      supabaseUser,
    };
  }

  async findOrCreateSMSAccount(phone: string) {
    try {
      // Try to find existing user
      const user = await this.userService.findByPhoneNumber(phone);
      if (user) {
        return user;
      } else {
        // Otherwise create a new account + user
        const user = await this.createSMSAccount({
          phone: phone,
        });
        return user;
      }
    } catch (e) {
      this.logger.log('Could not find or create user via sms: ', e);
    }
  }

  async createSMSAccount(input: { phone: string }) {
    const phoneNumber = input.phone.replace(/[+-.]/g, '');
    try {
      // Create a supabase account
      const supabaseAccount =
        await this.supabaseService.createSMSBasedAccount(phoneNumber);
      // If successfully created
      if (supabaseAccount.data.user) {
        // Create a user record
        const userRecord = await this.userService.createOrUpdateUserRecord(
          { phone: phoneNumber },
          supabaseAccount.data.user,
        );
        return userRecord;
      } else if (supabaseAccount.error.status === 422) {
        // If user account already exists, fetch the user and return it
        const user = await this.userService.findByPhoneNumber(phoneNumber);
        if (user) {
          return user;
        } else {
          // If a supabase account exists, but not user record, create a user record in the db
          // Find the supabase user first.
          const supabaseUser =
            await this.supabaseService.findUserByPhone(phoneNumber);
          const newUser = await this.userService.createOrUpdateUserRecord(
            {
              phone: phoneNumber,
            },
            supabaseUser,
          );
          return newUser;
        }
      }
    } catch (e) {
      this.logger.log('Unable to create account: ', e);
    }
  }
}
