import {
  confirmOrderedInfo,
  deliveryEnd,
  deliveryPickUp,
  saveOrderedInfo,
} from './repository/order-repo';
import { OrderInterface } from './schemas/types/order-interface';
import { findAccountById } from '../account/repositories/account-repo';

export const placeAnOrderService = async (
  body: OrderInterface,
  storeId: string,
  userId: string,
): Promise<OrderInterface> => {
  body.storeId = storeId;
  body.customerId = userId;
  return await saveOrderedInfo(body);
};

export const confirmOrderService = async (
  param: string,
  ownerId: string,
): Promise<OrderInterface | boolean> => {
  const owner = await findAccountById(ownerId);
  const confirm = await confirmOrderedInfo(param, owner['storeId']);
  if (!confirm) {
    return false;
  }
  return confirm;
};

export const deliveryPickUpService = async (
  param: string,
  minDeliveryTime: number,
  maxDeliveryTime: number,
  ownerId: string,
): Promise<OrderInterface | boolean> => {
  const owner = await findAccountById(ownerId);
  const pickUP = await deliveryPickUp(
    param,
    minDeliveryTime,
    maxDeliveryTime,
    owner['storeId'],
  );
  if (!pickUP) {
    return false;
  }

  return pickUP;
};

export const deliveryEndService = async (
  param: string,
  ownerId: string,
): Promise<OrderInterface | boolean> => {
  const owner = await findAccountById(ownerId);
  const end = await deliveryEnd(param, owner['storeId']);
  if (!end) {
    return false;
  }
  return end;
};
