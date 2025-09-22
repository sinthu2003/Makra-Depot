import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { Types } from 'mongoose'
import { WishListDto } from 'src/dto/WishList.dto';

@Controller('wish-list')
export class WishListController {
    constructor(private readonly wishService : WishListService){}

    // create 
    @Post()
    async addWish(@Body() data:{userId :  Types.ObjectId,prd : Types.ObjectId}) {
        const createItem : WishListDto = {
            user_id : new Types.ObjectId(data.userId),
            product_id : new Types.ObjectId(data.prd)
        }
        return await this.wishService.addList(createItem)
    }

    // update
    @Delete(':product_id')
    async updateWish(@Param('product_id') product_id : string) {
        const objectId = new Types.ObjectId(product_id);
        return await this.wishService.deleteList(objectId)
    }

    // fetch
    // @Get()
    // async getWish(){
    //     return await this.wishService.fetchData()
    // }

    @Get(':user_id')
    async getWish(@Param ('user_id') user_id : string){
        return await this.wishService.fetchData(user_id)
    }
}
