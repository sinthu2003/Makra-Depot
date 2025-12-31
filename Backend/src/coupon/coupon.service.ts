import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon } from '../schemas/Coupon.schema';

@Injectable()
export class CouponService {
    constructor(@InjectModel(Coupon.name) private readonly model : Model<Coupon> ){}

    async getValidCoupon(couponCode: string) {
        const coupon = await this.model.findOne({ code: couponCode }).exec();

        if (!coupon) {
            throw new NotFoundException('Invalid coupon code');
        }

        const now = new Date();

        // Check validity window & active state
        if (!coupon.isActive || now < coupon.validFrom || now > coupon.validUntil) {
            throw new NotFoundException('Coupon is expired or inactive');
        }

        return coupon
}

}
