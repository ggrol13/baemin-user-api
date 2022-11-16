import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';
import {
  basketController,
  bMartReviewController,
  deleteBasketController,
  deleteBMartReviewController,
  getAllProductController,
  getProductCategoryController,
  getProductController,
} from './b-mart-controller';

const router = {
  '/bMart/productCategory': {
    GET: async (): Promise<ResponseInterface> =>
      await getProductCategoryController(),
  },
  '/bMart/allProducts': {
    GET: async (): Promise<ResponseInterface> =>
      await getAllProductController(),
  },
  '/bMart/product/{productId}': {
    GET: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await getProductController(event),
  },
  //basket
  '/bMart/basket/{productId}': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await basketController(event),
  },
  '/bMart/basket/{basketId}': {
    DELETE: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await deleteBasketController(event),
  },
  //review
  '/bMart/review/{productId}': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await bMartReviewController(event),
  },
  '/bMart/review/{reviewId}': {
    DELETE: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await deleteBMartReviewController(event),
  },
};

export const bMartRouter = (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  const controller = router[event.resource][event.httpMethod];

  return controller(event, context);
};
