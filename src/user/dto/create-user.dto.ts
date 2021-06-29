import { IsEmail,IsMobilePhone,IsNotEmpty,IsString, Length, Matches } from "class-validator";

export  class SignUpUserDto{

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsEmail()
    emailId:string;

    @IsNotEmpty()
    @IsString()
    @Length(6,18)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message:"password is too weak"
    })
    password:string;
    
    @IsNotEmpty()
    @IsMobilePhone('en-IN')
    phoneNumber:string;

    @IsNotEmpty()
    @IsString()
    address:string

    
}