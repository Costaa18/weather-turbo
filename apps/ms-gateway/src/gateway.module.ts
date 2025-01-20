import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WeatherModule } from './weather/weather.module';

import { MicroservicesModule } from './microservices/microservices.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [WeatherModule, MicroservicesModule, UserModule],
})
export class GatewayModule { }