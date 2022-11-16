import mongoose, { model } from 'mongoose';
import { OrderShoppingLiveInterface } from './types/order-shoppingLive-interface';

const orderShoppingLiveSchema = new mongoose.Schema({
  liveId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [],
  status: {
    type: String,
    enum: ['confirmingOrder', 'confirmedOrder', 'pickUp', 'delivered'],
  },
});

export const OrderShoppingLiveSchemaModel = model<OrderShoppingLiveInterface>(
  'orderShoppingLive',
  orderShoppingLiveSchema,
  'orderShoppingLive',
);
