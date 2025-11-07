import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Address {
  @Prop() street: string;
  @Prop() city: string;
  @Prop() state: string;
  @Prop() zipCode: string;
  @Prop() country: string;
  @Prop() id: string;
  @Prop() label: string;
  @Prop({ default: false }) isDefault: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

@Schema({ timestamps: true ,collection:"Customers"})
export class Customer {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ unique: true, sparse: true })
  email?: string;

  @Prop()
  alternatePhone?: string;

  @Prop()
  whatsappNumber?: string;

  @Prop({ enum: ['bronze', 'silver', 'gold', 'platinum'], default: 'bronze' })
  tier: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop({ enum: ['male', 'female', 'other'], required: false })
  gender?: string;

  @Prop({ type: AddressSchema })
  address?: Address;

  @Prop({ type: [AddressSchema], default: [] })
  shippingAddresses: Address[];

  @Prop({ default: 'active' })
  status: string;

  @Prop()
  wishlist:[]

  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ default: false })
  phoneVerified: boolean;

  @Prop({ enum: ['card', 'cod', 'upi'], default: 'card' })
  preferredPaymentMethod: string;

  @Prop({ default: true })
  smsNotificationsEnabled: boolean;

  @Prop({ default: true })
  pushNotificationsEnabled: boolean;

  @Prop({ default: true })
  newsletterSubscribed: boolean;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop()
  notes?: string;

  @Prop({ type: Types.ObjectId, ref: 'Customer', required: false })
  referredBy?: Customer;

  @Prop({ default: 0 })
  totalOrders: number;

  @Prop({ default: 0 })
  totalSpent: number;

}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
