import { IsMobilePhone, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateUserDto{

    @IsString()
    @Length(6,18)
    password:string;

    @IsNotEmpty()
    @IsMobilePhone('en-IN')
    phoneNumber:string

    @IsString()
    address:string

}