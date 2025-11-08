import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get,Request, Put, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { JwtGuard } from '../user/auth/jwt-auth.guard';
import { Public } from '../public.decorator';

@Controller('customers')
export class CustomersController {
  constructor(private readonly authService: CustomersService) {}

  // userLogin in your front-end uses this
@Post('otp/generate')
  async sendOtp(@Body() data: any) {
    const res = await this.authService.sendOtp(data.phone);
    return {
      success: true,
      code: 200,
      data: {
        phone: res.phone
      }
    };
  }

  @Post('otp/verify')
  async verifyOtp(@Body() dto: any) {
      const res = await this.authService.verifyOtp(dto.phone, dto.otp);
      if (res.requiresRegistration) {
        return {
          success: true,
          code: 200,
          data: {
            requiresRegistration: true,
            phone: res.phone
          }
        };
      }
      if (!res.requiresRegistration) {
        return {
          success: true,
          code: 200,
          data: {
           requiresRegistration:res.requiresRegistration,
          token: res.token,
          customer: res.customer
          }
        };
      }

  }

  @Post('complete-registration')
  async completeRegistration(@Body() data: any) {
      const res = await this.authService.completeRegistration(data);
      return {
        success: true,
        code: 201,
        data: {
          token: res.token,
          customer: res.customer
        }
      };
  }

  //  a user detail
  @UseGuards(JwtGuard)
  @Get('me')
  async getData(@Request() req) {
    const userPhone = req.user.phone
    const user = await this.authService.getUserData(userPhone)
    return {
        success: true,
        code: 201,
        data: user
      };
  }

  @UseGuards(JwtGuard)
  @Put('me')
  async updateAddress(@Request() req,@Body() data){
    const userPhone = req.user.phone
    return this.authService.addAddress(userPhone,data)
  }

  // @Public()
  // @Post('sms')
  // sendSms(@Body() data:any) {
  //   return this.authService.orderPlacedSms(data)
  // }

  @UseGuards(JwtGuard)
  @Post('orderUpdate')
  orderUpdate(@Request() req,@Body() data:any){
    const userPhone = req.user.phone
    return this.authService.orderUpdate(userPhone,data.total)
  }

  @Put(':id/wishlist')
  update(@Param('id') id:any,@Body() data:any){
    return this.authService.updateWishList(id,data.requestBody)
  }

}
