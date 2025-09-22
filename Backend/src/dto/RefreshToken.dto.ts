import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Types } from 'mongoose'

export class RefreshTokenDto {

    // @IsNotEmpty() @IsString()
    // accessToken : String

    // @IsNotEmpty()
    // user_id : Types.ObjectId

    @IsNotEmpty() @IsString()
    refreshToken : string

    // @IsDate()
    // expiryDate : Date
}