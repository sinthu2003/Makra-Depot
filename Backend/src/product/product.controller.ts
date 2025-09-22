import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/public.decorator';

@Controller('products')
export class ProductController {
    constructor(private readonly product : ProductService){}

    @Public()
    @Get()
    async getProducts() {
        return await this.product.getProducts();
    }

    @Get(':id')
    async getPrdById(@Param('id') id:string){
        return this.product.getPrdById(id)
    }

    // @Patch(':id')
    // async update(@Param('id') id:string){
    //     return await this.product.update(id)
    // }
    
    // @Patch('wishlist/:id')
    // async updWish(@Param('id') id:string){
    //     return await this.product.updateWish(id)
    // } 
}
