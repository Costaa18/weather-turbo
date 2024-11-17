import { Length } from "class-validator"

export class WeatherByCityDto {
    @Length(3, 30)
    city: string
}