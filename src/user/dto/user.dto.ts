import { IsAlpha, IsInt, IsNegative, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString, IsStrongPassword } from "class-validator"

export class UserDto {
    @IsOptional()
    @IsStrongPassword()
    @IsNotEmpty()
    password?: string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    age?: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    full_name?: string
}
