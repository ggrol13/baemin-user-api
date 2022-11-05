import { findProductCategories } from './repositories/b-mart-repo';

export const getProductCategoryService = async () => {
  return await findProductCategories();
};
