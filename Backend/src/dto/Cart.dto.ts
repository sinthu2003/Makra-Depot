import { IsNotEmpty, IsNumber } from "class-validator";
import {Types} from 'mongoose'
export class CartDto {
    @IsNotEmpty()
    user_id: Types.ObjectId

    @IsNotEmpty()
    product_id: Types.ObjectId

    @IsNotEmpty() @IsNumber()
    quantity:Number
}