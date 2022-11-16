import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';
import {
  confirmBMartOrderController,
  confirmOrderController,
  confirmShoppingLiveOrderController,
  deliveryEndController,
  deliveryPickUpController,
  endBMartOrderController,
  endShoppingLiveOrderController,
  orderBMartController,
  orderShoppingLiveController,
  pickUpBMartOrderController,
  pickUpShoppingLiveOrderController,
  placeAnOrderController,
} from './order-controller';
import { response } from '../../common/response';

const router = {
  '/order/store/{storeId}': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await placeAnOrderController(event),
  },
  '/order/store/confirm/{orderId}': {
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await confirmOrderController(event),
  },
  '/order/store/pickUp/{orderId}': {
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await deliveryPickUpController(event),
  },
  '/order/store/deliveryEnd/{orderId}': {
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await deliveryEndController(event),
  },
  //bMartOrder
  '/order/bMart': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await orderBMartController(event),
  },
  '/order/bMart/confirm/{orderId}': {
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await confirmBMartOrderController(event),
  },
  '/order/bMart/pickUp/{orderId}': {
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await pickUpBMartOrderController(event),
  },
  '/order/bMart/deliveryEnd/{orderId}': {
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await endBMartOrderController(event),
  },
  //shoppingLive
  '/order/shoppingLive/{shoppingLiveId}': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await orderShoppingLiveController(event),
  },
  '/order/shoppingLive/confirm/{orderId}': {
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await confirmShoppingLiveOrderController(event),
  },
  '/order/shoppingLive/pickUp/{orderId}': {
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await pickUpShoppingLiveOrderController(event),
  },
  '/order/shoppingLive/deliveryEnd/{orderId}': {
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await endShoppingLiveOrderController(event),
  },
};

export const orderRouter = (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> | ResponseInterface => {
  let controller;
  try {
    controller = router[event.resource][event.httpMethod];
  } catch (e) {
    return response(500, {
      result: false,
      message: 'fail',
      body: 'API ERROR',
    });
  }

  return controller(event, context);
};
