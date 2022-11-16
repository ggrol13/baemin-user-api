import { ProductCategoryModel } from '../schemas/b-mart-category-schema';
import { ProductModel } from '../schemas/b-mart-schema';
import { BMartReviewModel } from '../schemas/b-mart-review-shcema';
import mongoose from 'mongoose';

export const findProductCategories = async () => {
  return ProductCategoryModel.find();
};

export const findProductDetail = async (productId) => {
  return ProductModel.findOne({ _id: productId });
};

export const aggregateProductCategory = async (categoryId) => {
  return ProductCategoryModel.aggregate([
    {
      $match: { _id: categoryId },
    },
    {
      $lookup: {
        from: 'bMartProduct',
        localField: 'productId',
        foreignField: '_id',
        as: 'products',
        pipeline: [
          {
            $lookup: {
              from: 'bMartReview',
              localField: '_id',
              foreignField: 'productId',
              as: 'review',
              pipeline: [
                {
                  $group: {
                    _id: '$productId',
                    avgScore: { $avg: '$score' },
                    count: { $count: {} },
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ]);
};

export const aggregateProductReview = async () => {
  return ProductModel.aggregate([
    {
      $lookup: {
        from: 'bMartReview',
        localField: '_id',
        foreignField: 'productId',
        as: 'review',
        pipeline: [
          {
            $group: {
              _id: '$productId',
              avgScore: { $avg: '$score' },
              count: { $count: {} },
            },
          },
        ],
      },
    },
    { $project: { _id: 1, name: 1, price: 1, imgPath: 1, review: 1 } },
  ]);
};

export const findProductById = async (productId) => {
  return ProductModel.findOne({ _id: productId });
};

export const saveBMartReview = async (body) => {
  const model = new BMartReviewModel(body);
  return model.save();
};

export const deleteBMartReview = async (
  reviewId: string,
  userId: mongoose.Schema.Types.ObjectId,
) => {
  return BMartReviewModel.findOneAndDelete({ _id: reviewId, userId }).exec();
};
