import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        const arr= await this.model.find({customerPhone:phone})
        return arr
    }
}
