import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Types} from 'mongoose'
import { User } from "./User.schema";
import { Product } from "./Product.schema";

@Schema()
export class Cart {
    @Prop({type:Types.ObjectId,ref : Product.name ,required:true})
    product_id: Product

    @Prop({type:Types.ObjectId,ref : User.name ,required:true})
    user_id:User

    @Prop({default:1})
    quantity:number
}

export const CartSchema = SchemaFactory.createForClass(Cart)