import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true ,collection:"Products"})
export class Products {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  defaultRating: number;

  @Prop({ default: true })
  inStock: boolean;

  @Prop({ default: "active" })
  status: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: "/assets/Product/Product.webp" })
  image: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);