import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from 'src/dto/Cart.dto';
import  {Types}  from 'mongoose'

@Controller('cart')
export class CartController {
    constructor(private readonly cartService : CartService){}

    // specific users cart
    // @Get(':id')
    // getCartItems(@Param('id') id:string){
    //     return this.cartService.getCartItems(id);
    // }

    @Get(':user_id')
    getCartItems(@Param('user_id') user_id : string){
        return this.cartService.getCartItems(user_id);
    }

    @Get('prd/:product_id')
    GetCartById(@Param('product_id') product_id :string) {
        return this.cartService.getCart(product_id)
    }

    @Post()
    async addItemsToCart(@Body () data : {user_id:string,product_id:string}) {
        const arr: CartDto = {
        user_id: new Types.ObjectId(data.user_id),
        product_id: new  Types.ObjectId(data.product_id),
        quantity: 1
    };
        return await this.cartService.addItemsToCart(arr);
    }

    @Delete(':id')
    deleteItem(@Param('id') id:string)
    {
        return this.cartService.deleteItem(id);
    } 

    @Patch(':id')
    updateCart(@Param('id') id:string,@Body() data : CartDto){
        return this.cartService.updateCart(id,data)
    }

    @Patch('addOne/:id')
    addOne(@Param('id') id:string){
        return this.cartService.addOne(id)
    }

    @Patch('minusOne/:id')
    minusOne(@Param('id') id:string){
        return this.cartService.minusOne(id)
    }

}
