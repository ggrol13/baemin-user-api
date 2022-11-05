import { StoreModel } from '../schemas/store-schema';
import {
  StoreInterface,
  StoreModelInterface,
} from '../schemas/types/store-interface';
import { MenuInterface } from '../schemas/types/store-menu-interface';

export const findWholeStoreModel = async (): Promise<StoreInterface[]> =>
  await StoreModel.find();

export const findWholeMenu = async (storeId): Promise<MenuInterface[]> =>
  await StoreModel.find({ _id: storeId }, 'menuCategory');

export const findStoreModelById = async (id): Promise<StoreModelInterface> =>
  await StoreModel.findOne({ _id: id });
