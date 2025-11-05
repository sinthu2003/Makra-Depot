import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products } from 'src/schemas/Products.schema';

@Injectable()
export class ProductsService {
     constructor(@InjectModel(Products.name) private readonly model : Model<Products> ){}

     async getData(query: any) {
        const {
            sort = 'createdAt',
            order = 'desc',
            status,
            inStock,
            tags,
            category,
            brand,
            // page = 1,
            // limit = 20,
        } = query;

        const filter: any = {};

        if (status) filter.status = status;
        if (inStock) filter.inStock = inStock === 'true';

        if (tags) {
            filter.tags = { $in: tags.split(',') };
        }

        if (category) {
            filter.category = { $in: category.split(',') };
        }

        if (brand) {
            filter.brand = { $in: brand.split(',') };
        }

        // const skip = (page - 1) * +limit;

        const products = await this.model
            .find(filter)
            .sort({ [sort]: order === 'desc' ? -1 : 1 })
            // .skip(skip)
            // .limit(+limit);

        const total = await this.model.countDocuments(filter);
        // const totalPages = Math.ceil(total / +limit);
        return {
            success: true,
            code: 200,
            data: {
            data: products,
            total,
            // page: +page,
            // limit: +limit,
            // totalPages
            }
        };
        }

    // get prd by slug
    async getProductBySlug(slug: string) {
    const product = await this.model.findOne({ slug });

        if (!product) {
            return {
            success: false,
            code: 404,
            message: 'Product not found'
            };
        }

        return {
            success: true,
            code: 200,
            data: product,
        };
    }




}
