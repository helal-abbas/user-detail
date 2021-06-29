import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto{

    @IsEmail()
    @IsNotEmpty()
    emailId:string;

    @IsString()
    @IsNotEmpty()
    password:string
}