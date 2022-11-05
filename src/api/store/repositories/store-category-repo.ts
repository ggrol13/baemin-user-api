import { StoreCategoryModel } from '../schemas/store-category-schema';
import { StoreCategoryInterface } from '../schemas/types/store-category-interface';

export const findStoreCategoryModel = async (
  storeCategoryId: string,
): Promise<StoreCategoryInterface[]> =>
  await StoreCategoryModel.find({ _id: storeCategoryId });
