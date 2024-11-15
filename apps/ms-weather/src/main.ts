import { NestFactory } from '@nestjs/core';
import { WeatherModule } from './weather.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(WeatherModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      port: 6379,
      host: 'redis',
    },
  });
  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
