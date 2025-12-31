import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Brand } from 'src/schemas/Brand.schema';
import { Order } from 'src/schemas/Order.schema';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private readonly model : Model<Order> ){}

    async create(data:any){
            const lastOrder = await this.model
                                .findOne()
                                .sort({ orderNumber: -1 })
                                .exec();

                let newOrderNumber = 'O-0001';

                if (lastOrder && lastOrder.orderNumber) {
                    const lastNumber = parseInt(lastOrder.orderNumber.replace('O-', ''), 10);
                    const nextNumber = lastNumber + 1;
                    newOrderNumber = `O-${String(nextNumber).padStart(4, '0')}`;
                }

                // Attach to data
                data.orderNumber = newOrderNumber;
                    return this.model.create(data)
                }

    async get(phone:any){
        const arr= await this.model.find({customerPhone:phone}).sort({createdAt:-1})
        return arr
    }

    async uploadProof(id:any,data:any){
        const paymentProofData = {
            file:data,
            _id: data._id || new Types.ObjectId()
        };
        const arr = await this.model.findByIdAndUpdate(id,{ paymentStatus:'paid',$push: { paymentProofs: paymentProofData } },{ new: true });
        return arr
    }

    async delProof(id:any,data:any){
        const proofObjectId = new Types.ObjectId(data);
        const arr = await this.model.findByIdAndUpdate(id,{$pull: { paymentProofs: {_id:proofObjectId} } },{ new: true });
        
        if(arr?.paymentProofs.length == 0){
            await this.model.findByIdAndUpdate(id,{ paymentStatus:'pending'})
        }
        return arr
    }

    async cancelOrder (id:any) {
        return this.model.findByIdAndUpdate(id,{status:'cancelled'},{new:true})
    }
}
