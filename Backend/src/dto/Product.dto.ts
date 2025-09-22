import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ProductDto {
    @IsString() @IsNotEmpty()
    name:String

    @IsNotEmpty()
    desc:String

    @IsNotEmpty() @IsNumber()
    rate:Number

    @IsNotEmpty() @IsBoolean()
    added:Boolean
    
    @IsNotEmpty()
    img:String
}