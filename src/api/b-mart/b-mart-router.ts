import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';
import { getProductCategoryController } from './b-mart-controller';

const router = {
  '/bMart/productCategory': {
    GET: async () => {
      await getProductCategoryController();
    },
  },
  '/bMart/product': {
    GET: async () => {},
  },
};

export const bMartRouter = (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  const controller = router[event.resource][event.httpMethod];

  return controller(event, context);
};
