import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ProductDto {
    @IsString() @IsNotEmpty()
    name:string

    @IsString()
    desc:string

    @IsNotEmpty() @IsNumber()
    rate:number

    @IsNumber()
    discount:number

    @IsBoolean()
    new:boolean

    @IsNotEmpty() @IsBoolean()
    stock:boolean

    @IsString() 
    section:string
    
    @IsNotEmpty() @IsNumber()
    shipping_days:number
    
    @IsBoolean()
    added:boolean

    @IsBoolean()
    liked:boolean

    @IsNotEmpty()
    img:string
}