import { SetMetadata } from "@nestjs/common"
import { Role } from "./role.enum"

// using 'roles' may confuse so create a var
export const Role_Key = 'roles'

// ...role can store more than one roles
export const Roles = (...role : Role[]) => SetMetadata(Role_Key,role)