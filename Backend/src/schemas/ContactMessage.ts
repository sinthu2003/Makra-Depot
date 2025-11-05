import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true ,collection:"ContactMessages"})
export class ContactMessage {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: 'pending' })
  status: 'pending' | 'closed';

  @Prop({ default: '' })
  adminResponse: string;
}

export const ContactMessageSchema = SchemaFactory.createForClass(ContactMessage);
