import { StoreModel } from '../schemas/store-schema';
import {
  StoreInterface,
  StoreModelInterface,
} from '../schemas/types/store-interface';
import { MenuInterface } from '../schemas/types/store-menu-interface';

export const findWholeStoreModel = async (): Promise<StoreInterface[]> =>
  await StoreModel.aggregate([
    {
      $lookup: {
        from: 'StoreReview',
        localField: '_id',
        foreignField: 'storeId',
        as: 'review',
        pipeline: [
          {
            $group: {
              _id: '$storeId',
              avgScore: { $avg: '$score' },
            },
          },
        ],
      },
    },
  ]);

export const findWholeMenu = async (storeId): Promise<MenuInterface[]> =>
  await StoreModel.find({ _id: storeId }, 'menuCategory');

export const findStoreModelById = async (id): Promise<StoreModelInterface> =>
  await StoreModel.findOne({ _id: id });
