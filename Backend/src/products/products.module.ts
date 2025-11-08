import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from '../schemas/Brand.schema';
import { Category, CategorySchema } from '../schemas/Category.schema';
import {  Products, ProductsSchema } from '../schemas/Products.schema';

@Module({
  imports : [
          MongooseModule.forFeature([
            {
              name: Brand.name,
              schema : BrandSchema
            }
          ]),
          MongooseModule.forFeature([
            {
              name: Category.name,
              schema : CategorySchema
            }
          ]),
          MongooseModule.forFeature([
            {
              name: Products.name,
              schema : ProductsSchema
            }
          ]),
        ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
