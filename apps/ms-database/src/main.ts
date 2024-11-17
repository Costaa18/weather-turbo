import { NestFactory } from '@nestjs/core';
import { DatabaseModule } from './database.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(DatabaseModule);

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
        name: 'DATABASE_SERVICE',
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
      },
    });

    await app.startAllMicroservices();
    logger.log('Microservice DATABASE_SERVICE is running and connected to Redis.');
  } catch (error) {
    logger.error('Failed to start the microservice', error.stack);
    process.exit(1); // Encerra o processo em caso de erro fatal
  }

  // Manipulação de sinais para encerramento controlado
  process.on('SIGINT', async () => {
    logger.log('SIGINT received. Shutting down microservice gracefully.');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    logger.log('SIGTERM received. Shutting down microservice gracefully.');
    process.exit(0);
  });
}
bootstrap();
