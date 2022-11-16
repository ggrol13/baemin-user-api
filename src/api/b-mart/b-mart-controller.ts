import { response } from '../../common/response';
import {
  basketService,
  bMartReviewService,
  deleteBasketService,
  deleteBMartReviewService,
  getAllProductService,
  getProductCategoryService,
  getProductService,
} from './b-mart-service';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';

export const getProductCategoryController = async () => {
  const category = await getProductCategoryService();
  return response(200, {
    result: true,
    message: 'success',
    body: category,
  });
};

export const getAllProductController = async () => {
  const product = await getAllProductService();
  return response(200, {
    result: true,
    message: 'success',
    body: product,
  });
};

export const getProductController = async (event: APIGatewayProxyEvent) => {
  const product = await getProductService(event.pathParameters.productId);
  return response(200, {
    result: true,
    message: 'success',
    body: product,
  });
};

export const basketController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const product = await basketService(
    JSON.parse(event.body),
    event.pathParameters.productId,
    event['userId'],
  );
  return response(200, {
    result: true,
    message: 'success',
    body: product,
  });
};

export const deleteBasketController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const deleted = await deleteBasketService(
    event.pathParameters.basketId,
    event['userId'],
  );
  return response(200, {
    result: true,
    message: 'success',
    body: deleted,
  });
};

export const bMartReviewController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const review = await bMartReviewService(
    JSON.parse(event.body),
    event['userId'],
    event.pathParameters.productId,
  );
  return response(200, {
    result: true,
    message: 'success',
    body: review,
  });
};

export const deleteBMartReviewController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const deleted = await deleteBMartReviewService(
    event.pathParameters.reviewId,
    event['userId'],
  );
  return response(200, {
    result: true,
    message: 'success',
    body: deleted,
  });
};
