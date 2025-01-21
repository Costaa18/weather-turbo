import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(GatewayModule);

    app.useGlobalPipes(new ValidationPipe(
      {
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }
    ));
    
    app.enableCors({
      origin: '*',
      //credentials: true,
    })

    // Configuração global de validação



    const port = process.env.GATEWAY_PORT || 3000;

    await app.listen(port);

    logger.log(`Gateway is running on http://localhost:${port}`);
  } catch (error) {
    // Log detalhado em caso de erro fatal
    logger.error('Error during application bootstrap', error.stack);
    process.exit(1);
  }

  // Encerramento controlado ao receber sinais do sistema
  process.on('SIGINT', async () => {
    logger.log('SIGINT received. Shutting down the gateway gracefully.');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    logger.log('SIGTERM received. Shutting down the gateway gracefully.');
    process.exit(0);
  });
}
bootstrap();
