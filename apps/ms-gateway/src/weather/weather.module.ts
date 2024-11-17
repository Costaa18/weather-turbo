
import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroservicesModule } from 'src/microservices/microservices.module';

@Module({
    imports: [MicroservicesModule],
    controllers: [WeatherController],
})

export class WeatherModule { }