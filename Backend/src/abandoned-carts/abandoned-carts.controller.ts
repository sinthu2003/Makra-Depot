import { Body, Controller, Get, Put, Request, UseGuards } from '@nestjs/common';
import { AbandonedCartsService } from './abandoned-carts.service';
import { JwtGuard } from 'src/user/auth/jwt-auth.guard';

@Controller('abandoned-cart')
export class AbandonedCartsController {
    constructor(private readonly service : AbandonedCartsService){}
    
    @Put('/my-cart')
    updateCart(@Body() data:any) {
        return this.service.newUpdate(data.requestBody)
    }

    @UseGuards(JwtGuard)
    @Get('/my-cart')
    getCart(@Request() req){
        const phone=req.user.phone
        return this.service.get(phone)
    }
}
