import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true,collection:"Categories" })
export class Category {

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ default: 0 })
  productCount: number;

  @Prop({ default: '/assets/Product/Product.webp' })
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
