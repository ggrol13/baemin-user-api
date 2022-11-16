import { APIGatewayProxyEvent } from 'aws-lambda';
import { response } from '../../common/response';
import {
  liveCalenderService,
  livesInCategoriesService,
  shoppingLiveDetailService,
  shoppingLiveService,
} from './shopping-live-service';

export const shoppingLiveController = async (event: APIGatewayProxyEvent) => {
  const shoppingLives = await shoppingLiveService(
    event.queryStringParameters ? event.queryStringParameters.category : null,
  );
  return response(200, {
    result: true,
    message: 'success',
    body: shoppingLives,
  });
};

export const shoppingLiveDetailController = async (
  event: APIGatewayProxyEvent,
) => {
  const shoppingLive = await shoppingLiveDetailService(
    event.pathParameters.shoppingLiveId,
  );
  return response(200, {
    result: true,
    message: 'success',
    body: shoppingLive,
  });
};

export const livesInCategoriesController = async (
  event: APIGatewayProxyEvent,
) => {
  if (!event.queryStringParameters) {
    return response(500, {
      result: false,
      message: 'failed',
      body: 'error',
    });
  }
  const shoppingLives = await livesInCategoriesService(
    event.queryStringParameters.name,
  );
  return response(200, {
    result: true,
    message: 'success',
    body: shoppingLives,
  });
};

export const liveCalenderController = async (event: APIGatewayProxyEvent) => {
  if (!event.queryStringParameters) {
    return response(500, {
      result: false,
      message: 'failed',
      body: 'error',
    });
  }
  const liveCalender = await liveCalenderService(
    event.queryStringParameters.date,
  );
  return response(200, {
    result: true,
    message: 'success',
    body: liveCalender,
  });
};
