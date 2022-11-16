import { shoppingLiveModelSchema } from '../schemas/shopping-live-schema';
import { shoppingLiveCategoryModelSchema } from '../schemas/shopping-live-category';
import {
  ShoppingInterface,
  ShoppingLiveInterface,
} from '../schemas/types/shopping-live-interface';

export const findShoppingLives = () => {
  return shoppingLiveCategoryModelSchema.aggregate([
    {
      $lookup: {
        from: 'shoppingLiveProduct',
        localField: 'shoppingId',
        foreignField: '_id',
        as: 'shoppingId',
        pipeline: [{ $project: { name: 1, videoPath: 1, product: 1 } }],
      },
    },
  ]);
};

export const findShoppingLiveById = async (
  liveId,
): Promise<ShoppingLiveInterface> => {
  return await shoppingLiveModelSchema
    .findOne({
      _id: liveId,
    })
    .exec();
};

export const findCategoryWithShoppingLiveByName = async (name) => {
  return shoppingLiveCategoryModelSchema.aggregate([
    { $match: { name } },
    {
      $lookup: {
        from: 'shoppingLiveProduct',
        localField: 'shoppingId',
        foreignField: '_id',
        as: 'shoppingId',
        pipeline: [{ $project: { name: 1, videoPath: 1, product: 1 } }],
      },
    },
  ]);
};

export const aggregateShoppingLives = async (categoryId, liveId) => {
  return shoppingLiveCategoryModelSchema.aggregate<ShoppingInterface>([
    { $match: { _id: categoryId } },
    {
      $lookup: {
        from: 'shoppingLiveProduct',
        localField: 'shoppingId',
        foreignField: '_id',
        as: 'shopping',
        pipeline: [
          { $match: { _id: { $ne: liveId } } },
          { $project: { name: 1, videoPath: 1, product: 1 } },
        ],
      },
    },
  ]);
};

export const findLivesInCategories = (name) => {
  if (name === 'encoreYN') {
    return shoppingLiveModelSchema.find(
      { encoreYN: true },
      { name: 1, videoPath: 1, product: { $slice: 1 } },
    );
  } else if (name === 'funYN') {
    return shoppingLiveModelSchema.find(
      { funYN: true },
      { name: 1, videoPath: 1, product: { $slice: 1 } },
    );
  } else if (name === 'dessertYN') {
    return shoppingLiveModelSchema.find(
      { dessertYN: true },
      { name: 1, videoPath: 1, product: { $slice: 1 } },
    );
  } else {
    return shoppingLiveModelSchema.find(
      { deliciousYN: true },
      { name: 1, videoPath: 1, product: { $slice: 1 } },
    );
  }
};
