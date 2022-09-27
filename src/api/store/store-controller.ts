import { findStore, findStoreCategory } from './store-service';
import { response } from '../../common/response';
import { StoreCategoryInterface } from './schemas/types/store-category.interface';
import { ResponseInterface } from '../../common/types/response.interface';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const getStoreCategory = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const storeCategories: StoreCategoryInterface[] = await findStoreCategory(
    event.pathParameters.storeCategoryId,
  );

  return response<StoreCategoryInterface[]>(200, {
    result: true,
    message: 'success',
    body: storeCategories,
  });
};

export const getStore = async () => {
  const returnValues = await findStore();

  return response(200, {
    result: true,
    message: 'success',
    body: returnValues,
  });
};
