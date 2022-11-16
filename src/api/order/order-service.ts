import {
  confirmBMartOrder,
  confirmOrderedInfo,
  confirmShoppingLiveOrder,
  deliveryEnd,
  deliveryPickUp,
  endBMartOrder,
  endShoppingLiveOrder,
  pickUpBMartOrder,
  pickUpShoppingLiveOrder,
  saveOrderBMart,
  saveOrderedInfo,
  saveOrderShoppingLive,
} from './repository/order-repo';
import { OrderInterface } from './schemas/types/order-interface';
import { findAccountById } from '../account/repositories/account-repo';
import {
  deleteAllBasket,
  findBasketsByUserId,
} from '../b-mart/repositories/b-mart-basket-repo';
import { findShoppingLiveById } from '../shopping-live/repositories/shopping-live-repo';

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

export const orderBMartService = async (status: string, userId: string) => {
  const products = await findBasketsByUserId(userId);
  const orders = await saveOrderBMart(userId, status, products);
  await deleteAllBasket();
  return orders;
};

export const confirmBMartOrderService = async (orderId) => {
  return await confirmBMartOrder(orderId);
};

export const pickUpBMartOrderService = async (orderId, min, max) => {
  return await pickUpBMartOrder(orderId, min, max);
};

export const endBMartOrderService = async (orderId) => {
  return await endBMartOrder(orderId);
};

export const orderShoppingLiveService = async (body, liveId, userId) => {
  const live = await findShoppingLiveById(liveId);
  const orderProducts = [];
  live.product.forEach((product) => {
    body.products.forEach((bodyProduct) => {
      if (bodyProduct.name === product.name) {
        product.count = bodyProduct.count;
        orderProducts.push(product);
      }
    });
  });
  body.liveId = liveId;
  body.userId = userId;
  body.products = orderProducts;
  return await saveOrderShoppingLive(body);
};

export const confirmShoppingLiveOrderService = async (orderId) => {
  return await confirmShoppingLiveOrder(orderId);
};

export const pickUpShoppingLiveOrderService = async (orderId) => {
  return await pickUpShoppingLiveOrder(orderId);
};

export const endShoppingLiveOrderService = async (orderId) => {
  return await endShoppingLiveOrder(orderId);
};
