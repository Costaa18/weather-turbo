// database.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class DatabaseController {
  private readonly logger = new Logger(DatabaseController.name);
  constructor(private readonly databaseService: DatabaseService) { }

  @EventPattern('save_weather')
  async saveWeatherData(payload: { ip: string, weatherData: WeatherData, city?: string }): Promise<void> {
    const { ip, weatherData, city } = payload;
    try {
      this.logger.log(`Saving weather data for IP: ${ip}`);
      await this.databaseService.saveWeatherData(ip, weatherData, city);
    } catch (error) {
      this.logger.error('Error while saving weather data in the database', error.stack);
      throw new Error('Error while saving weather data in the database');
    }
  }
}
