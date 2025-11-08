import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, maxLength, MinLength } from "class-validator";

export class UserDto {

    @IsString() @IsNotEmpty()
    name:String;

    @IsEmail() @IsNotEmpty()
    email:String;

    @IsString() @IsNotEmpty()
    password: string

    @IsNotEmpty() @MaxLength(10) @MinLength(10) 
    mobile_number: String;

    @IsString() @IsNotEmpty()
    address:String;

    @IsString() @IsNotEmpty()
    role : String

}