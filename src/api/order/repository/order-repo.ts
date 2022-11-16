import { OrderStoreSchemaModel } from '../schemas/order-store-schema';
import { OrderInterface } from '../schemas/types/order-interface';
import { OrderBMartSchemaModel } from '../schemas/order-bMart-schema';
import { OrderShoppingLiveSchemaModel } from '../schemas/order-shoppingLive-schema';

export const saveOrderedInfo = (body: OrderInterface) => {
  const model = new OrderStoreSchemaModel(body);
  return model.save();
};

export const confirmOrderedInfo = async (param: string, storeId: string) => {
  return OrderStoreSchemaModel.findOneAndUpdate(
    { _id: param, storeId },
    { status: 'confirmedOrder' },
    {
      returnDocument: 'after',
    },
  ).exec();
};

export const deliveryPickUp = async (
  param: string,
  minDeliveryTime: number,
  maxDeliveryTime: number,
  storeId: string,
) => {
  return OrderStoreSchemaModel.findOneAndUpdate(
    { _id: param, storeId },
    { status: 'pickUp', $set: { minDeliveryTime, maxDeliveryTime } },
    {
      returnDocument: 'after',
      projection: { userId: 0 },
    },
  ).exec();
};

export const deliveryEnd = async (param: string, storeId: string) => {
  return OrderStoreSchemaModel.findOneAndUpdate(
    { _id: param, storeId },
    {
      status: 'delivery End',
      $unset: { minDeliveryTime: '', maxDeliveryTime: '' },
    },
    {
      returnDocument: 'after',
      projection: { userId: 0 },
    },
  ).exec();
};

export const findOrderById = async (storeId) => {
  return OrderStoreSchemaModel.find({ storeId, status: 'delivery End' });
};

export const saveOrderBMart = async (userId, status, products) => {
  const model = new OrderBMartSchemaModel({ userId, status, products });
  return await model.save();
};

export const confirmBMartOrder = async (orderId) => {
  return OrderBMartSchemaModel.findOneAndUpdate(
    { _id: orderId },
    { status: 'confirmedOrder' },
    {
      returnDocument: 'after',
    },
  ).exec();
};

export const pickUpBMartOrder = async (
  orderId: string,
  minDeliveryTime: number,
  maxDeliveryTime: number,
) => {
  return OrderBMartSchemaModel.findOneAndUpdate(
    { _id: orderId },
    { status: 'pickUp', $set: { minDeliveryTime, maxDeliveryTime } },
    {
      returnDocument: 'after',
      projection: { userId: 0 },
    },
  ).exec();
};

export const endBMartOrder = async (orderId: string) => {
  return OrderBMartSchemaModel.findOneAndUpdate(
    { _id: orderId },
    {
      status: 'delivery End',
      $unset: { minDeliveryTime: '', maxDeliveryTime: '' },
    },
    {
      returnDocument: 'after',
      projection: { userId: 0 },
    },
  ).exec();
};

export const saveOrderShoppingLive = async (body) => {
  return new OrderShoppingLiveSchemaModel(body).save();
};

export const confirmShoppingLiveOrder = async (orderId) => {
  return OrderShoppingLiveSchemaModel.findOneAndUpdate(
    { _id: orderId },
    { status: 'confirmedOrder' },
    {
      returnDocument: 'after',
    },
  ).exec();
};

export const pickUpShoppingLiveOrder = async (orderId: string) => {
  return OrderShoppingLiveSchemaModel.findOneAndUpdate(
    { _id: orderId },
    { status: 'pickUp' },
    {
      returnDocument: 'after',
      projection: { userId: 0 },
    },
  ).exec();
};

export const endShoppingLiveOrder = async (orderId: string) => {
  return OrderShoppingLiveSchemaModel.findOneAndUpdate(
    { _id: orderId },
    {
      status: 'delivery End',
    },
    {
      returnDocument: 'after',
      projection: { userId: 0 },
    },
  ).exec();
};
