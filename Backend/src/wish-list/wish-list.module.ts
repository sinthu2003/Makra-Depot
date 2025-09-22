import { Module } from '@nestjs/common';
import { WishListController } from './wish-list.controller';
import { WishListService } from './wish-list.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WishList, WishListSchema } from 'src/schemas/WishList.schema';

@Module({
  imports : [ MongooseModule.forFeature([{
    name : WishList.name,
    schema : WishListSchema
  }])],
  controllers: [WishListController],
  providers: [WishListService]
})
export class WishListModule {}
