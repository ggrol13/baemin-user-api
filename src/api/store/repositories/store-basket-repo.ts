import {
  StoreBasketBodyInterface,
  StoreBasketModelInterface,
} from '../schemas/types/store-basket-interface';
import { StoreBasketModel } from '../schemas/store-basket-schema';

export const insertStoreBasket = async (
  body: StoreBasketBodyInterface,
): Promise<StoreBasketModelInterface> => {
  const model = new StoreBasketModel(body);
  return model.save();
};

export const findStoreBasketByStoreId =
  async (): Promise<StoreBasketModelInterface> => {
    return StoreBasketModel.findOne();
  };

export const deleteStoreBasketAll = async () => {
  await StoreBasketModel.deleteMany().exec();
};

export const deleteStoreBasketOne = async (basketId, userId) => {
  await StoreBasketModel.findOneAndDelete({ basketId, userId }).exec();
};
