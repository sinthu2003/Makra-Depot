import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtGuard } from '../user/auth/jwt-auth.guard';

@Controller('orders')
export class OrderController {
    constructor(private readonly service: OrderService) {}

    @Post('my-order')
    async createOrder(@Body() data:any){
        const res = await this.service.create(data) 
        return {
            success:true,
            code:201,
            data:res
        }
    }

    @UseGuards(JwtGuard)
    @Get('my-orders')
    async orderList(@Request() req){
        const phone = req.user.phone
        const res = await this.service.get(phone) 
        return {
            success:true,
            code:201,
            data:res
        }
    }
}
