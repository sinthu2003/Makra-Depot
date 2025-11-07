import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor() {
        super({
            ignoreExpiration:false,
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'code@123'
        })
    }

    async validate(data : any) {
        return {userId : data.id,phone : data.phone}
    }
}