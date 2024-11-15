import { Controller, Get, Inject, Req } from "@nestjs/common";
import { Client, ClientProxy, Transport } from "@nestjs/microservices";
import { Request } from "express";

@Controller('weather')
export class WeatherController {
    constructor(
        @Inject('WEATHER_SERVICE') private readonly weatherService: ClientProxy,
    ) { }

    @Get()
    async getWeatherByIP(@Req() request: Request): Promise<WeatherData> {
        //const ip = request.ip;
        const ip = '82.155.117.114';
        console.log('IP:', ip);
        const weatherData = await this.weatherService.send<WeatherData>('get_weather_by_ip', ip).toPromise();
        return weatherData;
    }

    /*
    @Get("city")
    getWeatherByCity(@Body() weatherByCityDto: WeatherByCityDto): string {
        return this.weatherService.getWeatherByCity(weatherByCityDto);
    }
        */
} 
