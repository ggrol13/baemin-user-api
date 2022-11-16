import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { connectMongoMiddleWare } from '../middleware/database';
import { storeRouter } from '../api/store/store-router';
import { ResponseInterface } from '../common/types/response.interface';
import { accountRouter } from '../api/account/account-router';
import middy from '@middy/core';
import { jwtMiddleware } from '../middleware/tokenMiddleWare';
import { paymentRouter } from '../api/payments/payment-router';
import { orderRouter } from '../api/order/order-router';
import { amountRouter } from '../api/amount/amount-router';
import { bMartRouter } from '../api/b-mart/b-mart-router';
import { shoppingLiveRouter } from '../api/shopping-live/shopping-live-router';

export const storeHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  return storeRouter(event, context);
};

export const store = middy(storeHandler)
  .use(connectMongoMiddleWare())
  .use(jwtMiddleware());

export const accountHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  return accountRouter(event, context);
};

export const account = middy(accountHandler).use(connectMongoMiddleWare());

export const paymentHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  return paymentRouter(event, context);
};

export const payment = middy(paymentHandler)
  .use(connectMongoMiddleWare())
  .use(jwtMiddleware());

const orderHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  return orderRouter(event, context);
};

export const order = middy(orderHandler)
  .use(connectMongoMiddleWare())
  .use(jwtMiddleware());

const amountHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  return amountRouter(event, context);
};

export const amount = middy(amountHandler)
  .use(connectMongoMiddleWare())
  .use(jwtMiddleware());

const bMartHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  return bMartRouter(event, context);
};

export const bMart = middy(bMartHandler)
  .use(connectMongoMiddleWare())
  .use(jwtMiddleware());

const shoppingLiveHandler = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  return shoppingLiveRouter(event, context);
};

export const shoppingLive = middy(shoppingLiveHandler)
  .use(connectMongoMiddleWare())
  .use(jwtMiddleware());
