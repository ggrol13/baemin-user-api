import mongoose, { model } from 'mongoose';
import { BMartBasketInterface } from './types/b-mart-basket-interface';

export const bMartBasketSchema = new mongoose.Schema({
  productId: String,
  userId: String,
  productName: String,
  price: Number,
  count: Number,
});

export const bMartBasketModel = model<BMartBasketInterface>(
  'bMartBasket',
  bMartBasketSchema,
  'bMartBasket',
);
