import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true,collection:"Company" })
export class Company {

  @Prop({ required: true })
  companyName: string;

  @Prop()
  description: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  website: string;

  @Prop({
    type: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String }
    }
  })
  address: Record<string, string>;

  @Prop({
    type: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      youtube: { type: String }
    }
  })
  socialMedia: Record<string, string>;
}

export const CompanySchema = SchemaFactory.createForClass(Company);