import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  Types } from 'mongoose';

@Schema({ timestamps: true,collection:"coupons" })
export class Coupon {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop()
  description?: string;

  @Prop({required: true })
  type: string;

  @Prop({ required: true })
  discountValue: number;

  @Prop({ default: 0 })
  minimumOrderAmount: number;

  @Prop()
  maximumDiscountAmount?: number;

  @Prop({ required: true })
  validFrom: Date;

  @Prop({ required: true })
  validUntil: Date;

  @Prop({ default: 0 })
  usageLimit: number;

  @Prop({ default: 1 })
  usagePerCustomer: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: [] })
  applicableProducts: string[];

  @Prop({ type: [String], default: [] })
  applicableCategories: string[];

  @Prop({ type: [String], default: [] })
  excludedProducts: string[];

  @Prop({ type: [String], default: [] })
  excludedCategories: string[];

}

export const CouponSchema = SchemaFactory.createForClass(Coupon);

// {
//   "_id": "coupon-abc123",
//   "id": "coupon-abc123",
//   "code": "SUMMER2025",
//   "description": "Summer sale 20% off",
//   "type": "percentage",
//   "discountValue": 20,
//   "minimumOrderAmount": 100,
//   "maximumDiscountAmount": 50,
//   "validFrom": "2025-01-01T00:00:00Z",
//   "validUntil": "2025-12-31T23:59:59Z",
//   "usageLimit": 1000,
//   "usagePerCustomer": 1,
//   "usedCount": 150,
//   "isActive": true,
//   "applicableProducts": [],
//   "applicableCategories": ["aerial-fireworks"],
//   "excludedProducts": [],
//   "excludedCategories": [],
//   "createdAt": "2024-01-01T00:00:00Z",
//   "updatedAt": "2024-01-02T00:00:00Z"
// }