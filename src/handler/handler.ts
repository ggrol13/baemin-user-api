import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { connectMongo } from '../middleware/database';
import { storeRouter } from '../api/store/store-router';
import { ResponseInterface } from '../common/types/response.interface';

export const store = async (
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<ResponseInterface> => {
  await connectMongo();
  return storeRouter(event, context);
};
