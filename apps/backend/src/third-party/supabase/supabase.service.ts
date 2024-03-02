import { Injectable, Logger } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private logger: Logger = new Logger(SupabaseService.name);
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  async findUserByPhone(phone: string) {
    // Custom rpc https://supabase.com/dashboard/project/apyompdagqlkcxydlntz/sql/d2cd0b6e-f65f-4e6e-99c0-8a28c866f183
    const { data }: { data: [{ id: string }]; error: any } =
      await this.supabase.rpc('get_user_id_by_phone', {
        phone,
      });
    const id = data && data.length && data[0].id;
    if (id) {
      const supabaseUser = await this.supabase.auth.admin.getUserById(id);
      return supabaseUser.data.user;
    }
    return null;
  }

  async createSMSBasedAccount(phoneNumber: string) {
    try {
      // Create a new account on Supabase
      const supabaseAccount = await this.supabase.auth.admin.createUser({
        phone: phoneNumber,
        phone_confirm: true,
      });
      return supabaseAccount;
    } catch (e) {
      this.logger.log('error verifying token', e);
      throw e;
    }
  }

  async verifyToken(token: string) {
    try {
      const withoutBearer = token.replace('Bearer ', '');
      const supabaseUser = await this.supabase.auth.getUser(withoutBearer);
      return supabaseUser.data.user;
    } catch (e) {
      this.logger.log('error verifying token', e);
    }
  }
}
