import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "./role.enum";
import { Role_Key } from "./role.decorator";

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private reflect : Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const reqRoles = this.reflect.getAllAndOverride<Role []>(Role_Key,[
            context.getHandler(),
            context.getClass()
        ])

        if(!reqRoles) return true
        const user = context.switchToHttp().getRequest().user
        const result = reqRoles.some((check) =>{
             return user.role===check
        }
        )
        return result
    }
}