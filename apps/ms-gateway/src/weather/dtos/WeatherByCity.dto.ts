import { IsString, Length } from "class-validator"

export class WeatherByCityDto {

    @IsString()
    @Length(3, 30)
    city: string
}