import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { WeatherService } from './weather.service';
import { GeoData, WeatherByCityDto, WeatherData } from './types';

@Controller()
export class WeatherController {
  private readonly logger = new Logger(WeatherController.name);

  constructor(private readonly weatherService: WeatherService) { }

  /**
   * Obtém os dados do clima com base em dados de geolocalização recebidos via evento.
   * Evento: `get_weather`
   */
  @EventPattern('get_weather')
  async getWeatherByIP(@Payload() geoData: GeoData): Promise<WeatherData> {
    this.logger.log('Handling event: get_weather');
    try {
      return this.weatherService.getWeatherByIP(geoData);
    } catch (error) {
      this.logger.error('Error handling get_weather event', error.stack);
      throw error; // Repropaga o erro para que o emissor saiba do problema.
    }
  }

  /**
   * Obtém os dados do clima com base no nome da cidade recebida via evento.
   * Evento: `get_weather_by_city`
   */
  @EventPattern('get_weather_by_city')
  async getWeatherByCity(@Payload() weatherByCityDto: WeatherByCityDto): Promise<WeatherData> {
    this.logger.log('Handling event: get_weather_by_city');
    try {
      return this.weatherService.getWeatherByCity(weatherByCityDto);
    } catch (error) {
      this.logger.error('Error handling get_weather_by_city event', error.stack);
      throw error; // Repropaga o erro para que o emissor saiba do problema.
    }
  }

  /**
   * Obtém os dados da previsão do clima com base no nome da cidade recebida via evento.
   * Evento: `get_weather_forecast_by_city`
   */
  @EventPattern('get_weather_forecast_by_city')
  async getWeatherForecastByCity(@Payload() weatherByCityDto: WeatherByCityDto): Promise<WeatherData[]> {
    this.logger.log('Handling event: get_weather_forecast_by_city');
    try {
      return this.weatherService.getWeatherForecastByCity(weatherByCityDto);
    } catch (error) {
      this.logger.error('Error handling get_weather_forecast_by_city event', error.stack);
      throw error; // Repropaga o erro para que o emissor saiba do problema.
    }
  }
}
