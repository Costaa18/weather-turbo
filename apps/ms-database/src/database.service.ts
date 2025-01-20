// database.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase/subapase.service';

interface UserData {
  email: string;
}


@Injectable()
export class DatabaseService {
  constructor(private readonly supabaseService: SupabaseService) { }

  async saveWeatherData(ip: string, weatherData: WeatherData, city?: string, ): Promise<void> {
    if (!weatherData || typeof weatherData !== 'object') {
      throw new Error('Invalid weather data');
    }

    // Save weather data using the Supabase service
    await this.supabaseService.saveWeatherData(ip, weatherData, city);
  }

  async createUser(user: UserData): Promise<void> {

    await this.supabaseService.createUser(user);
  }
}