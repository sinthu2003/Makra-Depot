import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true,collection:"Otps"})
export class Otp {
  @Prop({ required: true }) phone: string;
  @Prop({ required: true }) code: string;
  @Prop({ default: 0 }) attempts: number;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);