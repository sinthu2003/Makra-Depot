import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose"
import { User } from "./User.schema";

@Schema()
export class RefreshToken {

    @Prop({type: Types.ObjectId,ref : User.name,required : true})
    user_id : Types.ObjectId

    @Prop({required : true})
    refreshToken : string

    @Prop({required : true})
    expiryDate : Date

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)