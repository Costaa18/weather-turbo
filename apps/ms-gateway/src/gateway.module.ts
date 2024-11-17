import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WeatherModule } from './weather/weather.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { MicroservicesModule } from './microservices/microservices.module';

@Module({
  imports: [WeatherModule, MicroservicesModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }