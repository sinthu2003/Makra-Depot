import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true ,collection:"Brands"})
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ default: '/assets/Brand/default.png' })
  logo: string;

  @Prop()
  website: string;

  @Prop({ default: 0 })
  productCount: number;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  metaTitle: string;

  @Prop()
  metaDescription: string;

  @Prop()
  metaKeywords: string;

  @Prop({ type: Object })
  customFields: Record<string, any>;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
