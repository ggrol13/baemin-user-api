import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';
import { response, UnAuthorizedError } from '../../common/response';
import {
  confirmBMartOrderService,
  confirmOrderService,
  confirmShoppingLiveOrderService,
  deliveryEndService,
  deliveryPickUpService,
  endBMartOrderService,
  endShoppingLiveOrderService,
  orderBMartService,
  orderShoppingLiveService,
  pickUpBMartOrderService,
  pickUpShoppingLiveOrderService,
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
  if (event['jwtLevel'] !== 2) {
    await UnAuthorizedError;
  }
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
  if (event['jwtLevel'] !== 2) {
    await UnAuthorizedError;
  }
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
  return response<DeliveryInterface>(200, {
    result: true,
    message: 'success',
    body: pickUp,
  });
};

export const deliveryEndController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  if (event['jwtLevel'] !== 2) {
    await UnAuthorizedError;
  }
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

  return response<DeliveryInterface>(200, {
    result: true,
    message: 'success',
    body: deliveryEnd,
  });
};

export const orderBMartController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const order = await orderBMartService(
    JSON.parse(event.body).status,
    event['userId'],
  );
  return response(200, {
    result: true,
    message: 'success',
    body: order,
  });
};

export const confirmBMartOrderController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  if (event['jwtLevel'] !== 3) {
    await UnAuthorizedError;
  }
  const order = await confirmBMartOrderService(event.pathParameters.orderId);
  return response(200, {
    result: true,
    message: 'success',
    body: order,
  });
};

export const pickUpBMartOrderController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  if (event['jwtLevel'] !== 3) {
    await UnAuthorizedError;
  }
  const { minDeliveryTime, maxDeliveryTime } = JSON.parse(event.body);
  const order = await pickUpBMartOrderService(
    event.pathParameters.orderId,
    minDeliveryTime,
    maxDeliveryTime,
  );
  return response(200, {
    result: true,
    message: 'success',
    body: order,
  });
};

export const endBMartOrderController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  if (event['jwtLevel'] !== 3) {
    await UnAuthorizedError;
  }
  const deleted = await endBMartOrderService(event.pathParameters.orderId);
  return response(200, {
    result: true,
    message: 'success',
    body: deleted,
  });
};

export const orderShoppingLiveController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  if (event['jwtLevel'] !== 3) {
    await UnAuthorizedError;
  }
  const order = await orderShoppingLiveService(
    JSON.parse(event.body),
    event.pathParameters.shoppingLiveId,
    event['userId'],
  );
  return response(200, {
    result: true,
    message: 'success',
    body: order,
  });
};

export const confirmShoppingLiveOrderController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  if (event['jwtLevel'] !== 3) {
    await UnAuthorizedError;
  }
  const order = await confirmShoppingLiveOrderService(
    event.pathParameters.orderId,
  );
  return response(200, {
    result: true,
    message: 'success',
    body: order,
  });
};

export const pickUpShoppingLiveOrderController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  if (event['jwtLevel'] !== 3) {
    await UnAuthorizedError;
  }
  const order = await pickUpShoppingLiveOrderService(
    event.pathParameters.orderId,
  );
  return response(200, {
    result: true,
    message: 'success',
    body: order,
  });
};

export const endShoppingLiveOrderController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  if (event['jwtLevel'] !== 3) {
    await UnAuthorizedError;
  }
  const deleted = await endShoppingLiveOrderService(
    event.pathParameters.orderId,
  );
  return response(200, {
    result: true,
    message: 'success',
    body: deleted,
  });
};
