import { IsEmail, IsNotEmpty, IsString, MinLength, } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    // @IsStrongPassword({
    //     minLength: 6,
    //     minLowercase: 1,
    //     minNumbers: 1,
    //     minUppercase: 1,
    //     minSymbols: 1
    // })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    password: string;
}