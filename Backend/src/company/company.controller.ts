import { Controller, Get } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
    constructor(private readonly comp : CompanyService){}
    
    @Get('/public')
    get(){
        return this.comp.getData()
    }
}
