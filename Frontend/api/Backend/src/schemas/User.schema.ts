import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../user/auth/roles/role.enum";

@Schema({timestamps : true,collection:"Users"})
export class User{
    @Prop({required:true})
    name:string

    @Prop({required:true,unique : true})
    email:string

    @Prop({required:true})
    password:string
    
    @Prop({required:true})
    mobile_number:string

    @Prop({required:true})
    address:string

    @Prop({type: 'String',enum : Role,default : Role.User})
    role : Role
}


export const UserSchema = SchemaFactory.createForClass(User)