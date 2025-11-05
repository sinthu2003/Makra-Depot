import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

class CartCustomerInfo {
  @Prop({ required: true })
  customerId: string;

  @Prop()
  customerName: string;

  @Prop()
  customerEmail: string;

  @Prop()
  customerPhone: string;
}

class CartItem {
  @Prop({ required: true })
  productId: string;

  @Prop()
  productName: string;

  @Prop()
  productSku: string;

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop({ required: true })
  unitPrice: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop()
  productImage: string;
}

@Schema({ timestamps: true, collection: 'abandoned_carts' })
export class AbandonedCart {
  @Prop()
  id: string;

  @Prop({ required: true, type: CartCustomerInfo })
  customer: CartCustomerInfo;

  @Prop({ type: [CartItem], default: [] })
  items: CartItem[];

  @Prop({ required: true, default: 0 })
  totalAmount: number;

  @Prop({ default: 0 })
  itemCount: number;

  @Prop()
  lastActivity: Date;

  @Prop({ default: 'pending' })
  recoveryStatus: string; 

  @Prop({ default: 0 })
  recoveryAttempts: number;

  @Prop()
  lastRecoveryAttempt: Date;

  @Prop()
  recoveryNotes: string;

  @Prop()
  sessionId: string; 

  @Prop()
  source: string;
}

export const AbandonedCartSchema = SchemaFactory.createForClass(AbandonedCart);
