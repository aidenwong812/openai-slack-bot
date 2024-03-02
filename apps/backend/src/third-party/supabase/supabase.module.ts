import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SupabaseService } from './supabase.service';

@Module({
  imports: [HttpModule],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
