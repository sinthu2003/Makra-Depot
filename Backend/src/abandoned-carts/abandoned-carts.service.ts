import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbandonedCart } from 'src/schemas/AbandonedCart.schema';

@Injectable()
export class AbandonedCartsService {
    constructor(@InjectModel(AbandonedCart.name) private readonly model : Model<AbandonedCart> ){}

    async newUpdate(data:any) {
        const checkUser = await this.model.findOne({"customer.customerPhone":data.customer.customerPhone})
        if(checkUser){
            return this.model.findByIdAndUpdate(checkUser._id,{items:data.items})
        }
        return this.model.create(data)
    }

    get(phone:string){
        return this.model.findOne({"customer.customerPhone":phone})
    }
}
