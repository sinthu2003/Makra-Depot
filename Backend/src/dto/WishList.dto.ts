import { IsNotEmpty } from "class-validator";
import {Types} from 'mongoose'

export class WishListDto {
    @IsNotEmpty()
    user_id : Types.ObjectId

    @IsNotEmpty()
    product_id : Types.ObjectId
}