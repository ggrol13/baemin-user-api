import mongoose from 'mongoose';
import { OrderReceiptInterface } from './types/order-receipt.interface';

const OrderReceiptSchema = new mongoose.Schema({
  store: mongoose.Schema.Types.ObjectId,
  orderId: String,
  orderName: String,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

export const OrderReceiptModel = mongoose.model<OrderReceiptInterface>(
  'OrderReceipt',
  OrderReceiptSchema,
  'OrderReceipt',
);
