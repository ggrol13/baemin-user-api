import {
  getMenuController,
  getStoreController,
  getStoreCategoryController,
  storeReviewController,
  getStoreReviewController,
  storeReviewDeleteController,
  storeReviewModifyController,
  storeLikeController,
  storeLikeDeleteController,
  getWholeStoreController,
  storeBasketController,
  storeBasketDeleteController,
} from './store-controller';
import { ResponseInterface } from '../../common/types/response.interface';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

const router = {
  '/store/category/{storeCategoryId}': {
    GET: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await getStoreCategoryController(event),
  },
  '/store': {
    GET: async (): Promise<ResponseInterface> =>
      await getWholeStoreController(),
  },
  '/store/{storeId}': {
    GET: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await getStoreController(event),
  },
  '/store/menu/{storeId}': {
    GET: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await getMenuController(event),
  },
  //review
  '/store/review': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await storeReviewController(event),
    GET: async (): Promise<ResponseInterface> =>
      await getStoreReviewController(),
  },
  '/store/review/{commentId}': {
    DELETE: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await storeReviewDeleteController(event),
    PUT: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await storeReviewModifyController(event),
  },
  //like
  '/store/like/{storeId}': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await storeLikeController(event),
    DELETE: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await storeLikeDeleteController(event),
  },
  //basket
  '/store/basket/{storeId}/{menuCategoryId}/{menuId}': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await storeBasketController(event),
  },
  '/store/basket/{basketId}': {
    DELETE: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await storeBasketDeleteController(event),
  },
};

export const storeRouter = (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  const controller = router[event.resource][event.httpMethod];

  return controller(event, context);
};
