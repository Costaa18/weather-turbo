import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.enableCors(); // Habilitar CORS
  await app.listen(3000);
}
bootstrap();
