import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) { }

  @EventPattern('get_weather_by_ip')
  async signup(ip: string): Promise<WeatherData> {
    console.log('WeatherController: get_weather_by_ip');
    return await this.weatherService.getWeatherByIP(ip);
  }
}
