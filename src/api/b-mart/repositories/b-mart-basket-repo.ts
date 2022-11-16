import { bMartBasketModel } from '../schemas/b-mart-basket-schema';

export const saveBasket = async (body) => {
  const model = new bMartBasketModel(body);
  return model.save();
};

export const deleteBasket = async (basketId, userId) => {
  return bMartBasketModel.findOneAndDelete({ _id: basketId, userId });
};

export const findBasketsByUserId = async (userId) => {
  return bMartBasketModel.find({ userId }, { userId: 0 });
};

export const deleteAllBasket = async () => {
  await bMartBasketModel.deleteMany().exec();
};
