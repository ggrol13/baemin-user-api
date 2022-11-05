import { response, UnAuthorizedError } from '../../common/response';
import { ResponseInterface } from '../../common/types/response.interface';
import { allStoresAmountService, storesAmountService } from './amount-service';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const allStoresAmountController =
  async (): Promise<ResponseInterface> => {
    const amount = await allStoresAmountService();
    return response(200, {
      result: true,
      message: 'success',
      body: amount,
    });
  };

export const storeAmountController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  if (event['jwtLevel'] !== 2) {
    return UnAuthorizedError();
  }
  const amount = await storesAmountService(event.pathParameters.storeId);
  return response(200, {
    result: true,
    message: 'success',
    body: amount,
  });
};
