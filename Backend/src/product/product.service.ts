import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schemas/Product.schema';
import {Model} from 'mongoose'

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel : Model<Product>){}

    getProducts = async() => {
        return await this.productModel.find()
    }

    // update = async(id : string) => {
    //     const getPrd = await this.productModel.findById(id)
    //     const state = !getPrd?.added
    //     return await this.productModel.findByIdAndUpdate(id,{added:state})
    // }

    getPrdById = async(id:string) => {
        const data = await this.productModel.findById(id)
        return data
    }

    // updateWish = async(id:string) => {
    //     const getPrd = await this.productModel.findById(id)
    //     const state = !getPrd?.liked
    //     return await this.productModel.findByIdAndUpdate(id,{liked:state})
    // }
}
