import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Types} from 'mongoose'
import { User } from "./User.schema";
import { Product } from "./Product.schema";

@Schema()
export class WishList {
    @Prop({required : true,type : Types.ObjectId,ref : User.name })
    user_id : Types.ObjectId

    @Prop({required:true,type : Types.ObjectId , ref : Product.name})
    product_id : Types.ObjectId
}

export const WishListSchema = SchemaFactory.createForClass(WishList)