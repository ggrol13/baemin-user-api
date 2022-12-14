import { OrderStoreSchemaModel } from '../../order/schemas/order-store-schema';

export const aggregateAllStoresAmount = async () => {
  return OrderStoreSchemaModel.aggregate([
    {
      $unwind: '$menu',
    },
    {
      $group: {
        _id: '$storeId',
        amount: { $sum: '$menu.totalAmount' },
      },
    },
    {
      $lookup: {
        from: 'stores',
        localField: '_id',
        foreignField: '_id',
        as: 'store',
        pipeline: [
          {
            $project: { _id: 0, name: '$name' },
          },
        ],
      },
    },
  ]);
};

export const aggregateStoreAmount = async (storeId) => {
  return OrderStoreSchemaModel.aggregate([
    { $match: { storeId } },
    {
      $unwind: '$menu',
    },
    {
      $group: {
        _id: storeId,
        amount: { $sum: '$menu.totalAmount' },
      },
    },
  ]);
};
