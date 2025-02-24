import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { GeoData, WeatherByCityDto, WeatherData } from './types'; // Importe os tipos apropriados.

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(private readonly httpService: HttpService) { }

  /**
   * Obtém dados do tempo com base nos dados de geolocalização.
   */
  async getWeatherByIP(geoData: GeoData): Promise<WeatherData> {
    const url = this.buildWeatherApiUrl(geoData.city, geoData.country);
    return this.fetchWeatherData(url);
  }

  /**
   * Obtém dados do tempo com base na cidade fornecida.
   */
  async getWeatherByCity(weatherByCityDto: WeatherByCityDto): Promise<WeatherData> {
    const url = this.buildWeatherApiUrl(weatherByCityDto.city);
    return this.fetchWeatherData(url);
  }

  /**
   * Constrói a URL para acessar a API de clima.
   */
  private buildWeatherApiUrl(city: string, country?: string): string {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('API Key for OpenWeather is not configured.');
    }
    const query = country ? `${city},${country}` : city;
    return `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
  }

  /**
   * Obtém dados do tempo para os próximos 4 dias com base na cidade fornecida.
   */
  async getWeatherForecastByCity(weatherByCityDto: WeatherByCityDto): Promise<WeatherData[]> {
    const url = this.buildWeatherForecastApiUrl(weatherByCityDto.city);
    return this.fetchWeatherForecastData(url);
  }

  /**
   * Constrói a URL para acessar a API de previsão do tempo.
   */
  private buildWeatherForecastApiUrl(city: string, country?: string): string {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('API Key for OpenWeather is not configured.');
    }
    const query = country ? `${city},${country}` : city;
    return `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`;
  }

  /**
   * Busca e processa os dados da API de previsão do tempo.
   */
  private async fetchWeatherForecastData(url: string): Promise<WeatherData[]> {
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return this.mapWeatherForecastData(response.data);
    } catch (error) {
      this.logger.error(`Failed to fetch weather forecast data from URL: ${url}`, error.stack);
      throw new BadRequestException('Unable to fetch weather forecast data. Please try again later.');
    }
  }

  /**
   * Mapeia a resposta da API de previsão do tempo para o tipo WeatherData.
   */
  private mapWeatherForecastData(data: any): WeatherData[] {
    if (!data.list || !Array.isArray(data.list) || data.list.length === 0) {
      throw new BadRequestException('Incomplete weather forecast data received from the API.');
    }
    return data.list
      .filter((item: any, index: number) => index % 8 === 0) // Filtra para obter dados a cada 24 horas (8 * 3 horas)
      .map((item: any) => ({
        temperature: item.main.temp,
        feelsLike: item.main.feels_like,
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        pressure: item.main.pressure,
        humidity: item.main.humidity,
        windSpeed: item.wind?.speed ?? 0,
        windDeg: item.wind?.deg ?? 0,
        weather: item.weather[0]?.main,
        description: item.weather[0]?.description,
        city: data.city.name,
        country: data.city.country,
        sunrise: data.city.sunrise,
        sunset: data.city.sunset,
        icon: item.weather[0]?.icon,
        current_time: item.dt,
        visibility: item.visibility,
      }));
  }
  /**
   * Busca e processa os dados da API do tempo.
   */
  private async fetchWeatherData(url: string): Promise<WeatherData> {
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      return this.mapWeatherData(response.data);
    } catch (error) {
      this.logger.error(`Failed to fetch weather data from URL: ${url}`, error.stack);
      throw new BadRequestException('Unable to fetch weather data. Please try again later.');
    }
  }

  /**
   * Mapeia a resposta da API para o tipo WeatherData.
   */
  private mapWeatherData(data: any): WeatherData {
    if (
      !data.main ||
      !data.weather ||
      !Array.isArray(data.weather) ||
      data.weather.length === 0 ||
      !data.sys
    ) {
      throw new BadRequestException('Incomplete weather data received from the API.');
    }
    return {
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      windSpeed: data.wind?.speed ?? 0,
      windDeg: data.wind?.deg ?? 0,
      weather: data.weather[0]?.main,
      description: data.weather[0]?.description,
      city: data.name,
      country: data.sys.country,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      icon: data.weather[0]?.icon,
      current_time: data.dt,
      visibility: data.visibility,
    };

  }
}
