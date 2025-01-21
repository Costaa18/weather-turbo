import { BadGatewayException, BadRequestException, Body, Controller, Get, Inject, Logger, Param, Post, Req } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { WeatherByCityDto } from "./dtos/WeatherByCity.dto";
import * as requestIp from 'request-ip';

@Controller('weather')
export class WeatherController {
    constructor(
        @Inject('WEATHER_SERVICE') private readonly weatherService: ClientProxy,
        @Inject('GEO_SERVICE') private readonly geoService: ClientProxy,
        @Inject('DATABASE_SERVICE') private readonly databaseService: ClientProxy
    ) { }

    private async getGeoDataByIP(ip: string): Promise<GeoData> {
        return this.geoService.send<GeoData>('get_geo', ip).toPromise();
    }

    private async getWeatherDataByGeo(weatherByCityDto: WeatherByCityDto): Promise<WeatherData> {
        return this.weatherService.send<WeatherData>('get_weather', weatherByCityDto).toPromise();
    }

    private async saveWeatherData(ip: string, weatherData: WeatherData, city?: string): Promise<void> {
        // Structure the payload correctly, ensuring weatherData is passed correctly
        const payload = { ip, weatherData, city };

        await this.databaseService.send('save_weather', payload).toPromise();
    }

    @Get()
    async getWeatherByIP(@Req() request: Request): Promise<WeatherData> {
        try {
            const ip = requestIp.getClientIp(request) || '82.155.117.114'; // Fallback IP
            //const ip = '82.155.117.114';
            console.log('IP:', ip);

            const geoData = await this.getGeoDataByIP(ip);

            if (!geoData || geoData.status !== 'success') {
                throw new BadGatewayException('Unable to get the location by IP');
            }

            const weatherData = await this.getWeatherDataByGeo({ city: geoData.city });

            await this.saveWeatherData(ip, weatherData);

            return weatherData;
        } catch (error) {
            console.error('Error fetching weather by IP:', error);
            throw new BadRequestException('Unable to get the weather by IP');
        }
    }

    @Get("city/:city")
    async getWeatherByCity(@Param() weatherByCityDto: WeatherByCityDto, @Req() request: Request): Promise<WeatherData> {
        //const ip = requestIp.getClientIp(request) 
        const ip = '82.155.117.114';
        const weatherData = await this.getWeatherDataByGeo({ city: weatherByCityDto.city });

        await this.saveWeatherData(ip, weatherData, weatherByCityDto.city);

        return weatherData;
    }

    @Get("forecast/:city")
    async getWeatherForecastByCity(@Param() weatherByCityDto: WeatherByCityDto): Promise<WeatherData[]> {
        return this.weatherService.send<WeatherData[]>('get_weather_forecast_by_city', weatherByCityDto).toPromise();
    }

}
