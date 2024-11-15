
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'WEATHER_SERVICE',
                transport: Transport.REDIS,
                options: {
                    host: 'redis',
                    port: 6379,
                },
            },
        ]),
    ],
    controllers: [WeatherController],
})

export class WeatherModule { }