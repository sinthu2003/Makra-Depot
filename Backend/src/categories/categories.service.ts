import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/Category.schema';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) private readonly model : Model<Category> ){}

    async getData(){
        const page = 1;
        const limit = 20;

        const res = await this.model.find(); // Return all items from DB
        const total = res.length;
        const totalPages = Math.ceil(total / limit) || 0;

        return {
        success: true,
        code: 200,
        data: {
            data: res,
            total,
            page,
            limit,
            totalPages
        }
        };
    }
}
