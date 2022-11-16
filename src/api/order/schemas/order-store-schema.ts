import mongoose from 'mongoose';
import { OrderInterface } from './types/order-interface';

const OrderStoreSchema = new mongoose.Schema({
  storeId: mongoose.Schema.Types.ObjectId,
  menu: [
    {
      name: String,
      number: Number,
      totalAmount: Number,
    },
  ],
  customerId: mongoose.Schema.Types.ObjectId,
  status: {
    type: String,
    enum: [
      'confirmingOrder',
      'confirmedOrder',
      'cooking',
      'pickUp',
      'delivered',
    ],
  },
  minDeliveryTime: Number,
  maxDeliveryTime: Number,
});

export const OrderStoreSchemaModel = mongoose.model<OrderInterface>(
  'Ordered',
  OrderStoreSchema,
  'Ordered',
);
