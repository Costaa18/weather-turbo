
import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { MicroservicesModule } from 'src/microservices/microservices.module';

@Module({
    imports: [MicroservicesModule],
    controllers: [UserController],
})

export class UserModule { }