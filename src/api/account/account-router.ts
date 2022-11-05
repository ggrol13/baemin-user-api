import {
  loginController,
  refreshTokenController,
  registerController,
  verifyAccessController,
} from './account-controller';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { ResponseInterface } from '../../common/types/response.interface';

export const accountRouters = {
  '/account/register': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await registerController(event),
  },
  '/account/login': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await loginController(event),
  },
  '/account/test': {
    POST: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await verifyAccessController(event),
  },
  '/account/refresh': {
    PATCH: async (event: APIGatewayProxyEvent): Promise<ResponseInterface> =>
      await refreshTokenController(event),
  },
};

export const accountRouter = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  const controller = accountRouters[event.resource][event.httpMethod];

  return controller(event, context);
};
