import mongoose, { model } from 'mongoose';
import { ProductCategoryInterface } from './types/b-mart-category-interface';

const productCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgPath: { type: String, required: true },
  productId: [{ type: mongoose.Schema.Types.ObjectId, required: false }],
});

export const ProductCategoryModel = model<ProductCategoryInterface>(
  'bMartProductCategory',
  productCategorySchema,
  'bMartProductCategory',
);
