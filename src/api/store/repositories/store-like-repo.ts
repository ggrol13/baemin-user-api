import { StoreLikeModel } from '../schemas/store-like-schema';
import { StoreLikeModelInterface } from '../schemas/types/store-like-interface';

export const checkStoreLike = async (
  storeId,
  userId,
): Promise<StoreLikeModelInterface> => {
  const model = new StoreLikeModel({ storeId, userId });
  return model.save();
};

export const deleteStoreLike = async (storeId, userId) => {
  return await StoreLikeModel.findOneAndDelete({ storeId, userId }).exec();
};
