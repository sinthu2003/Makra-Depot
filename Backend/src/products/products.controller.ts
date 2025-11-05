import { Controller, Get, Param, Query } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
     constructor(private readonly prd : ProductsService){}
    @Get()
    get(@Query() query: any) {
    return this.prd.getData(query);
    }

    @Get('slug/:slug')
    async getBySlug(@Param('slug') slug: string) {
        return this.prd.getProductBySlug(slug);
    }

}
