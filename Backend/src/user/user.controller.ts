import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/User.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './auth/jwt-auth.guard';
import { RefreshTokenDto } from '../dto/RefreshToken.dto';
import {Types} from 'mongoose'
import { Public } from '../public.decorator';
import { RoleGuard } from './auth/roles/role.guard';
import { Role } from './auth/roles/role.enum';
import { Roles } from './auth/roles/role.decorator';

@Controller('user')
@UseGuards(RoleGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // signup
//   @Public()
//   @Post()
//   create(@Body() createUserDto: UserDto) {
//     return this.userService.create(createUserDto);
//   }
// //   {
// //   "name": "Sinthu",
// //   "email" : "sinthu@gmail.com",
// //   "mobile_number" :"8768759078",
// //   "password": "yaar",
// //   "dob" : "",
// //   "address":"1236858756"
// // }

//   // login
//   @Public()
//   @Post('login')
//   login(@Body() data : LoginDto) {
//     return this.userService.login(data)
//   }

//   // auth guard
//   // @UseGuards(JwtGuard)
//   // a user detail
//   @Get()
//   async getData(@Request() req) {
//     const userId = req.user.userId
//     return await this.userService.getUserData(userId)
//   }

//   // refresh token
//   @Public()
//   @Post('refresh')
//   checkTokenExpiry(@Body() refreshToken: RefreshTokenDto) {
//     return this.userService.checkExpiry(refreshToken)
//   }

//   // all users
//   @Roles(Role.Admin)
//   @Get('list')
//   getAllUsers(){
//     return this.userService.getUsersList()
//   }

//   @Public()
//   @Post('sms')
//   sendSms(@Body() data:any) {
//     return this.userService.orderPlacedSms(data)
//   }

}