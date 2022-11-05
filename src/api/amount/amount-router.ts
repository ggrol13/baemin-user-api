import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';
import {
  allStoresAmountController,
  storeAmountController,
} from './amount-controller';

const router = {
  '/amount/allStores': {
    GET: async (): Promise<ResponseInterface> =>
      await allStoresAmountController(),
  },
  '/amount/store/{storeId}': {
    GET: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await storeAmountController(event),
  },
};

export const amountRouter = (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  const controller = router[event.resource][event.httpMethod];

  return controller(event, context);
};
