// database.controller.ts
import { Controller, Logger } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class DatabaseController {
  private readonly logger = new Logger(DatabaseController.name);
  constructor(private readonly databaseService: DatabaseService) { }

  @EventPattern('save_weather')
  async saveWeatherData(payload: { ip: string, weatherData: WeatherData, city?: string, userEmail?: string }): Promise<void> {
    const { ip, weatherData, city, userEmail } = payload;
    try {
      this.logger.log(`Saving weather data for Email: ${userEmail}`);
      await this.databaseService.saveWeatherData(ip, weatherData, city, userEmail);
    } catch (error) {
      this.logger.error('Error while saving weather data in the database', error.stack);
      throw new Error('Error while saving weather data in the database');
    }
  }

  @EventPattern('create_user')
  async createUser(user: any): Promise<void> {
    try {
      this.logger.log(`Creating user with Email: ${user.email}`);
      await this.databaseService.createUser(user);
    } catch (error) {
      this.logger.error('Error while creating user in the database', error);
      throw new Error('Error while creating user in the database');
    }
  }
}
