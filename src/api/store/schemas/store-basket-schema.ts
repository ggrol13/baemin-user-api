import mongoose, { model } from 'mongoose';
import { StoreBasketModelInterface } from './types/store-basket-interface';

const StoreBasketSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  userId: { type: String, required: true },
  count: { type: Number, required: true },
  menu: {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imgPath: { type: String, required: true },
    options: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
});

export const StoreBasketModel = model<StoreBasketModelInterface>(
  'StoreBasket',
  StoreBasketSchema,
  'StoreBasket',
);
