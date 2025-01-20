
import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroservicesModule } from 'src/microservices/microservices.module';

@Module({
    imports: [MicroservicesModule],
    controllers: [UserController],
    providers: [],
})

export class UserModule { }