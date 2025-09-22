import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './User.dto';

export class UpdateUserDto extends PartialType(UserDto) {}
