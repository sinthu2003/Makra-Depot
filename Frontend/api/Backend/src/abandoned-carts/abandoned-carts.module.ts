import { Module } from '@nestjs/common';
import { AbandonedCartsController } from './abandoned-carts.controller';
import { AbandonedCartsService } from './abandoned-carts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AbandonedCart, AbandonedCartSchema } from '../schemas/AbandonedCart.schema';

@Module({
  imports : [
          MongooseModule.forFeature([
            {
              name: AbandonedCart.name,
              schema : AbandonedCartSchema
            }
          ]),
        ],
  controllers: [AbandonedCartsController],
  providers: [AbandonedCartsService]
})
export class AbandonedCartsModule {}
