import mongoose, { model } from 'mongoose';
import { ShoppingLiveInterface } from './types/shopping-live-interface';

const ShoppingLiveSchema = new mongoose.Schema({
  examineYN: { type: Boolean, default: false },
  name: { type: String, required: true },
  videoPath: String,
  shoppingLiveCategoryId: mongoose.Schema.Types.ObjectId,
  product: [
    {
      name: { type: String, required: true },
      price: { type: String, required: true },
      imgPath: [String],
      count: { type: Number, required: true },
    },
  ],
  encoreYN: { type: Boolean, default: false },
  funYN: { type: Boolean, default: false },
  dessertYN: { type: Boolean, default: false },
  deliciousYN: { type: Boolean, default: false },
});

export const shoppingLiveModelSchema = model<ShoppingLiveInterface>(
  'ShoppingLiveProduct',
  ShoppingLiveSchema,
  'shoppingLiveProduct',
);
