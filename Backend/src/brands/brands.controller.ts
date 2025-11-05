import { Body, Controller, Get } from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('brands')
export class BrandsController {
    constructor(private readonly brand : BrandsService){}
    @Get('/active')
    get(){
        return this.brand.getData()
    }
}
