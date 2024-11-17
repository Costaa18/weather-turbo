import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WeatherModule } from './weather/weather.module';

import { MicroservicesModule } from './microservices/microservices.module';

@Module({
  imports: [WeatherModule, MicroservicesModule],
})
export class GatewayModule { }