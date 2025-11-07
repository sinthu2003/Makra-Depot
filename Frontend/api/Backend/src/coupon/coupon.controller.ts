import { Controller, Get, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';

@Controller('coupons')
export class CouponController {
    constructor(private readonly service : CouponService){}

    @Get('code/:code')
    get(@Param('code') code:any){
        return  this.service.getValidCoupon(code)
    }
}
