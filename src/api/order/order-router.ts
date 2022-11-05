import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';
import {
  confirmOrderController,
  deliveryEndController,
  deliveryPickUpController,
  placeAnOrderController,
} from './order-controller';
import { response } from '../../common/response';

const router = {
  '/order/{storeId}': {
    1: {
      POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
        await placeAnOrderController(event),
    },
    2: {
      POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
        await placeAnOrderController(event),
    },
  },
  '/order/confirm/{orderId}': {
    2: {
      PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
        await confirmOrderController(event),
    },
  },
  '/order/pickUp/{orderId}': {
    2: {
      PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
        await deliveryPickUpController(event),
    },
  },
  '/order/deliveryEnd/{orderId}': {
    2: {
      PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
        await deliveryEndController(event),
    },
  },
};

export const orderRouter = (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> | ResponseInterface => {
  let controller;
  try {
    controller = router[event.resource][event['jwtLevel']][event.httpMethod];
  } catch (e) {
    return response(500, {
      result: false,
      message: 'fail',
      body: 'API ERROR',
    });
  }

  return controller(event, context);
};
