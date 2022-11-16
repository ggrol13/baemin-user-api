import mongoose, { model } from 'mongoose';
import { OrderBMartInterface } from './types/order-bMart-interface';

const OrderBMartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  products: [],
  status: {
    type: String,
    enum: ['confirmingOrder', 'confirmedOrder', 'pickUp', 'delivered'],
  },
  minDeliveryTime: Number,
  maxDeliveryTime: Number,
});

export const OrderBMartSchemaModel = model<OrderBMartInterface>(
  'orderBMart',
  OrderBMartSchema,
  'orderBMart',
);
