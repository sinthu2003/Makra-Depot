import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from 'src/schemas/Cart.schema';
import mongoose,{Model, Types} from 'mongoose'
import { CartDto } from 'src/dto/Cart.dto';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private readonly cartModel : Model<Cart> ){}

    // getCartItems = async(id : string) => {
    //     const userId = new Types.ObjectId(id)
    //     const items = await this.cartModel.find({user_id : userId}).populate('product_id').exec();
    //     return items;
    // }
    getCartItems = async(id : string) => {
        const userId = new Types.ObjectId(id)
        const items = await this.cartModel.find({user_id : userId}).populate('product_id').exec();
        return items;
    }

    getCart = async(product_id : string) => {
        const productObjectId = new Types.ObjectId(product_id);
        return await this.cartModel.findOne({product_id : productObjectId}).exec()
    }

    addItemsToCart = async(data : CartDto) => {
        try{
            return await this.cartModel.create(data);
        }
        catch (e) {
            console.error(e)
        }
    }

    updateCart = async(id : string,data : CartDto) => {
        return await this.cartModel.findByIdAndUpdate(id,{quantity: data})
    }

    deleteItem = async(id:string) => {
        const item =await this.cartModel.findByIdAndDelete(id)
    }

    addOne = async (id:string) => {
        return await this.cartModel.findByIdAndUpdate(id,{$inc : {quantity : 1} })
    }

    minusOne = async (id:string) => {
        return await this.cartModel.findByIdAndUpdate(id,{$inc : {quantity : -1} })
    }
}

