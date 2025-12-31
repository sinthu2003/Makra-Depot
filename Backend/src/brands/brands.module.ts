import { Module } from '@nestjs/common';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from '../schemas/Brand.schema';
import { Category, CategorySchema } from '../schemas/Category.schema';

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
      ],
  controllers: [BrandsController],
  providers: [BrandsService]
})
export class BrandsModule {}
