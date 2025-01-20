import { IsString, IsOptional } from "class-validator";

export class UserAuthDto {
    @IsOptional()
    @IsString()
    email?: string;
}
