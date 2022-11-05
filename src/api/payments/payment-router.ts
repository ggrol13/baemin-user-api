import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';
import { getFail, getPayment, getSuccess } from './payment-controller';

const router = {
  '/payment': {
    GET: async (): Promise<ResponseInterface> => await getPayment(),
  },
  '/payment/success': {
    GET: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await getSuccess(event),
  },
  '/payment/fail': {
    GET: async (): Promise<ResponseInterface> => await getFail(),
  },
};

export const paymentRouter = (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  const controller = router[event.resource][event.httpMethod];

  return controller(event, context);
};
