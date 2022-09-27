import mongoose, { model } from 'mongoose';
import { StoreCategoryModelInterface } from './types/store-category.interface';

const storeCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgPath: { type: String, required: true },
  storeId: [{ type: mongoose.Schema.Types.ObjectId, required: false }],
});

export const StoreCategoryModel = model<StoreCategoryModelInterface>(
  'Store_Category',
  storeCategorySchema,
  'store_categories',
);
