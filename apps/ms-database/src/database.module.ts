import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { SupabaseService } from './supabase/subapase.service';

@Module({
  imports: [],
  controllers: [DatabaseController],
  providers: [DatabaseService, SupabaseService],
})
export class DatabaseModule {

}
