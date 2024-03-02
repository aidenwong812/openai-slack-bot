import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.resolver';
import { CustomStrategy } from './strategies/custom.strategy';
import { SupabaseModule } from '../third-party/supabase/supabase.module';

@Module({
  imports: [UsersModule, PassportModule, SupabaseModule],
  providers: [AuthService, AuthResolver, CustomStrategy],
  exports: [AuthService],
})
export class AuthModule {}
