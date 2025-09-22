import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WishList } from 'src/schemas/WishList.schema';
import { Model,Types} from 'mongoose'
import { WishListDto } from 'src/dto/WishList.dto';

@Injectable()
export class WishListService {
    constructor(@InjectModel(WishList.name) private readonly wishmodel : Model<WishList>){}

    addList = async (data : WishListDto) => {
        return (await this.wishmodel.create(data))
    }

    deleteList = async(data : Types.ObjectId) => {
        const item =  await this.wishmodel.findOne({product_id : data}).exec()
        return await this.wishmodel.findByIdAndDelete(item?._id)
    }

    // fetchData = async() => {
    //     return await this.wishmodel.find().populate('product_id')
    // }

    fetchData = async(userId : string) => {
        const objectId = new Types.ObjectId(userId);
        const result= await this.wishmodel.find({user_id : objectId}).populate('product_id').exec()
        return result
    }
}
