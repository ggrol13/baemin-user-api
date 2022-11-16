import mongoose, { model } from 'mongoose';
import { ShoppingLiveCategoryInterface } from './types/shopping-live-category-interface';

const shoppingLiveCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imgPath: { type: String, required: true },
  productId: [{ type: mongoose.Schema.Types.ObjectId, required: false }],
});

export const shoppingLiveCategoryModelSchema =
  model<ShoppingLiveCategoryInterface>(
    'shoppingLiveCategory',
    shoppingLiveCategorySchema,
    'shoppingLiveCategory',
  );
