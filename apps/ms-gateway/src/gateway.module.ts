import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WeatherModule } from './weather/weather.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'WEATHER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
    ]),
    WeatherModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule { }