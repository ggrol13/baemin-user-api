import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';
import { response } from '../../common/response';
import {
  confirmOrderService,
  deliveryEndService,
  deliveryPickUpService,
  placeAnOrderService,
} from './order-service';
import {
  DeliveryInterface,
  OrderInterface,
} from './schemas/types/order-interface';

export const placeAnOrderController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  let ordered;
  try {
    ordered = await placeAnOrderService(
      JSON.parse(event.body),
      event.pathParameters.storeId,
      event['userId'],
    );
  } catch (e) {
    return response(500, {
      result: false,
      message: 'fail',
      body: e,
    });
  }

  return response<OrderInterface>(200, {
    result: true,
    message: 'success',
    body: ordered,
  });
};

export const confirmOrderController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  let confirm;
  try {
    confirm = await confirmOrderService(
      event.pathParameters.orderId,
      event['userId'],
    );
  } catch (e) {
    return response(500, {
      result: false,
      message: 'fail',
      body: e,
    });
  }

  if (!confirm) {
    return response(401, {
      result: false,
      message: 'fail',
      body: 'Something Error',
    });
  }

  return response<OrderInterface>(200, {
    result: true,
    message: 'success',
    body: confirm,
  });
};

export const deliveryPickUpController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  let pickUp;
  const { minDeliveryTime, maxDeliveryTime } = JSON.parse(event.body);
  try {
    pickUp = await deliveryPickUpService(
      event.pathParameters.orderId,
      minDeliveryTime,
      maxDeliveryTime,
      event['userId'],
    );
  } catch (e) {
    return response(500, {
      result: false,
      message: 'fail',
      body: e,
    });
  }
  if (!pickUp) {
    return response(401, {
      result: false,
      message: 'fail',
      body: 'Something Error',
    });
  }
  const orderedInfo = JSON.parse(JSON.stringify(pickUp));
  delete orderedInfo.customer;
  return response<DeliveryInterface>(200, {
    result: true,
    message: 'success',
    body: orderedInfo,
  });
};

export const deliveryEndController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  let deliveryEnd;
  try {
    deliveryEnd = await deliveryEndService(
      event.pathParameters.orderId,
      event['userId'],
    );
  } catch (e) {
    return response(200, {
      result: false,
      message: 'fail',
      body: e,
    });
  }
  if (!deliveryEnd) {
    return response(401, {
      result: false,
      message: 'fail',
      body: 'Something Error',
    });
  }
  const orderedInfo = JSON.parse(JSON.stringify(deliveryEnd));
  delete orderedInfo.customer;

  return response<DeliveryInterface>(200, {
    result: true,
    message: 'success',
    body: orderedInfo,
  });
};
