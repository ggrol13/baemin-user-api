import mongoose, { model } from 'mongoose';
import { ProductCategoryModelInterface } from './types/b-mart-interface';

const productCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgPath: { type: String, required: true },
  productId: [{ type: mongoose.Schema.Types.ObjectId, required: false }],
});

export const ProductCategoryModel = model<ProductCategoryModelInterface>(
  'bMartProductCategory',
  productCategorySchema,
  'bMartProductCategory',
);
