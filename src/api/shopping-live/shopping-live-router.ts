import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import {
  liveCalenderController,
  livesInCategoriesController,
  shoppingLiveController,
  shoppingLiveDetailController,
} from './shopping-live-controller';

const router = {
  '/shoppingLive': {
    GET: async (event: APIGatewayProxyEvent) =>
      await shoppingLiveController(event),
  },
  '/shoppingLive/{shoppingLiveId}': {
    GET: async (event: APIGatewayProxyEvent) =>
      await shoppingLiveDetailController(event),
  },
  '/shoppingLive/stand': {
    GET: async (event: APIGatewayProxyEvent) =>
      await livesInCategoriesController(event),
  },
  '/shoppingLive/calender': {
    GET: async (event: APIGatewayProxyEvent) =>
      await liveCalenderController(event),
  },
};

export const shoppingLiveRouter = (
  event: APIGatewayProxyEvent,
  context: Context,
) => {
  const controller = router[event.resource][event.httpMethod];

  return controller(event, context);
};
