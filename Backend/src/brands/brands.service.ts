import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/schemas/Brand.schema';

@Injectable()
export class BrandsService {
    constructor(@InjectModel(Brand.name) private readonly model : Model<Brand> ){}

    async getData(){
        const page = 1;
        const limit = 20;
        const brands = await this.model.find({isActive:true});
        const total = brands.length;
        const totalPages = Math.ceil(total / limit) || 0;

        return {
        success: true,
        code: 200,
            data: brands,
            total,
            page,
            limit,
            totalPages
        };
    }
}
