import { findStoreCategoryModel } from './repositories/store-category-repo';
import { findStoreModel } from './repositories/store-repo';
import { StoreCategoryInterface } from './schemas/types/store-category.interface';

export const findStoreCategory = async (
  storeCategoryId,
): Promise<StoreCategoryInterface[]> => {
  return await findStoreCategoryModel(storeCategoryId);
};

export const findStore = async () => {
  return await findStoreModel();
};
