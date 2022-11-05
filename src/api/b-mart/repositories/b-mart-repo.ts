import { ProductCategoryModel } from '../schemas/b-mart-category-schema';

export const findProductCategories = async () => {
  return ProductCategoryModel.find();
};
