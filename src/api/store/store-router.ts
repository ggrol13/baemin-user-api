import { getStore, getStoreCategory } from './store-controller';
import { ResponseInterface } from '../../common/types/response.interface';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

const router = {
  '/storeCategory/{storeCategoryId}': {
    GET: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await getStoreCategory(event),
  },
  '/store': {
    GET: async () => await getStore(),
  },
};

export const storeRouter = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  const controller = router[event.resource][event.httpMethod];

  return controller(event, context);
};
