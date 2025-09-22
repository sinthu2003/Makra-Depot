import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Product {
    @Prop()
    name:string

    @Prop()
    desc:string

    @Prop()
    rate: number

    @Prop()
    added:boolean
    
    @Prop()
    liked:boolean
    
    @Prop()
    img:string
}

export const ProductSchema = SchemaFactory.createForClass(Product)