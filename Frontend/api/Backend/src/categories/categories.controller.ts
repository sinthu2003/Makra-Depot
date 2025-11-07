import { Body, Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly cat : CategoriesService){}
    @Get()
    get(){
        return this.cat.getData()
    }
}
