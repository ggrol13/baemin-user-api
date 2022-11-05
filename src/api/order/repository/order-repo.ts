import { OrderSchemaModel } from '../schemas/order-schema';
import { OrderInterface } from '../schemas/types/order-interface';

export const saveOrderedInfo = (body: OrderInterface) => {
  const model = new OrderSchemaModel(body);
  return model.save();
};

export const confirmOrderedInfo = async (param: string, storeId: string) => {
  return OrderSchemaModel.findOneAndUpdate(
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
  return OrderSchemaModel.findOneAndUpdate(
    { _id: param, storeId },
    { status: 'pickUp', $set: { minDeliveryTime, maxDeliveryTime } },
    {
      returnDocument: 'after',
    },
  ).exec();
};

export const deliveryEnd = async (param: string, storeId: string) => {
  return OrderSchemaModel.findOneAndUpdate(
    { _id: param, storeId },
    {
      status: 'delivery End',
      $unset: { minDeliveryTime: '', maxDeliveryTime: '' },
    },
    {
      returnDocument: 'after',
    },
  ).exec();
};

export const findOrderById = async (storeId) => {
  return OrderSchemaModel.find({ storeId, status: 'delivery End' });
};
