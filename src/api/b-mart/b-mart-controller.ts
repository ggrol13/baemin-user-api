import { response } from '../../common/response';
import { getProductCategoryService } from './b-mart-service';

export const getProductCategoryController = async () => {
  const category = await getProductCategoryService();
  return response(200, {
    result: true,
    message: 'success',
    body: category,
  });
};
