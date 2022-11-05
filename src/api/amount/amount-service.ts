import {
  aggregateAllStoresAmount,
  aggregateStoreAmount,
} from './repository/amount-repo';
import mongoose from 'mongoose';
import { findOrderById } from '../order/repository/order-repo';

export const allStoresAmountService = async () => {
  return await aggregateAllStoresAmount();
};

export const storesAmountService = async (storeId) => {
  storeId = new mongoose.Types.ObjectId(storeId);
  const orders = await findOrderById(storeId);
  const amount = await aggregateStoreAmount(storeId);
  const ordersAndAmount = {
    amount,
    orders,
  };
  return ordersAndAmount;
};
