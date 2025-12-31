import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './Customer.schema';
import {Types} from 'mongoose'

@Schema()
export class OrderItem {
  @Prop() productId: string;
  @Prop() productName: string;
  @Prop() sku: string;
  @Prop() price: number;
  @Prop() quantity: number;
  @Prop() subtotal: number;
  @Prop() image: string;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

@Schema()
export class PaymentProof {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop() file: string;
  @Prop({default:'Customer Upload'}) type: string;
}
export const PaymentProofSchema = SchemaFactory.createForClass(PaymentProof);

@Schema({ timestamps: true,collection:"Orders" })
export class Order {
  @Prop({ required: true, unique: true })
  orderNumber: string;

  @Prop() customerId: string;
  @Prop() customerName: string;
  @Prop() customerEmail?: string;
  @Prop() customerPhone: string;

  @Prop({ type: [OrderItemSchema], default: [] })
  items: OrderItem[];

  @Prop({ default: 0 }) subtotal: number;
  @Prop({ default: 0 }) tax: number;
  @Prop({ default: 0 }) shipping: number;
  @Prop({ default: 0 }) packing: number;
  @Prop({ default: 0 }) discount: number;
  @Prop({ required: true }) total: number;

  @Prop({ default: 'processing' })
  status: string;

  @Prop({ default: 'pending' })
  paymentStatus: string;

  @Prop() paymentMethod?: string;

  @Prop({ type: AddressSchema })
  shippingAddress?: Address;

  @Prop({ type: AddressSchema })
  billingAddress?: Address;

  @Prop() trackingNumber?: string;
  @Prop() carrier?: string;
  @Prop() estimatedDelivery?: Date;
  @Prop() deliveredAt?: Date;

  @Prop() internalNotes?: string;
  @Prop() customerNotes?: string;

  @Prop({ type: [PaymentProofSchema], default: [] })
  paymentProofs: PaymentProof[];

  @Prop() couponCode?: string;
  @Prop({ default: 0 }) couponDiscount?: number;

  @Prop({ default: 0 }) refundAmount?: number;
  @Prop() refundReason?: string;
  @Prop() refundedAt?: Date;

  @Prop() cancelReason?: string;
  @Prop() cancelledAt?: Date;

  @Prop() pickupLocation?: string;
  @Prop() pickupInstructions?: string;
  @Prop() pickupDate?: Date;

  @Prop() source?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);