import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {

  async getWeatherByIP(ip: string): Promise<WeatherData> {
    console.log('IP:', ip);
    const weatherData = {
      temperature: 0,
      feelsLike: 0,
      tempMin: 0,
      tempMax: 0,
      pressure: 0,
      humidity: 0,
      windSpeed: 0,
      windDeg: 0,
      weather: 'asdasd',
      description: 'asdasd',
      city: 'asdasd',
      country: 'asdasd',
      sunrise: 0,
      sunset: 0,
      icon: 'adasd',
    };
    return weatherData;
  }
}
