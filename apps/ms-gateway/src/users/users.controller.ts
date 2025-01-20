import { Body, Controller, Get, Inject, Logger, Post, Req } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { ClientProxy } from "@nestjs/microservices";


@Controller('users')
export class UserController {
    constructor(
        @Inject('DATABASE_SERVICE') private readonly databaseService: ClientProxy
    ) { }


    @Post()
    async createUser(@Body() createUserDto: CreateUserDto, @Req() request: Request): Promise<string> {
        Logger.log('Creating user', createUserDto);
        return this.databaseService.send('create_user', createUserDto).toPromise();
    }

    @Get('/history')
    async getHistory(@Req() request: Request): Promise<string> {
        return this.databaseService.send('get_user_history', {}).toPromise();
    }

}
