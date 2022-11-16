import {
  StoreOwnerReviewInterface,
  StoreReviewInterface,
  StoreReviewModelInterface,
  StoreUserReviewInterface,
} from '../schemas/types/store-review-interface';
import { StoreReviewModel } from '../schemas/store-review-schema';
import mongoose from 'mongoose';

export const saveStoreUserReview = async (
  body: StoreUserReviewInterface,
): Promise<StoreReviewModelInterface> => {
  const model = new StoreReviewModel(body);
  return model.save();
};

export const averageStoreScore = async (storeId) => {
  return StoreReviewModel.aggregate([
    {
      $group: {
        _id: storeId,
        storeAvg: { $avg: '$score' },
      },
    },
  ]);
};

export const findStoreReview = async () => {
  return await StoreReviewModel.find().exec();
};

export const saveOwnerReview = async (
  body: StoreOwnerReviewInterface,
  storeId: string,
  commentId: mongoose.Schema.Types.ObjectId,
): Promise<StoreReviewInterface> => {
  return StoreReviewModel.findOneAndUpdate(
    { storeId, _id: commentId },
    { ownerComment: body.ownerComment, flag: 1 },
    { returnDocument: 'after' },
  );
};

export const deleteStoreUserReview = async (
  commentId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
) => {
  await StoreReviewModel.findOneAndDelete({ _id: commentId, userId }).exec();
};

export const deleteStoreOwnerReview = async (
  commentId: mongoose.Schema.Types.ObjectId,
  ownerId: mongoose.Schema.Types.ObjectId,
) => {
  await StoreReviewModel.findOneAndUpdate(
    {
      _id: commentId,
      ownerId,
    },
    {
      $unset: { ownerComment: '' },
    },
    {
      returnDocument: 'after',
    },
  );
};

export const updateStoreUserReview = async (
  body: StoreUserReviewInterface,
  commentId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
): Promise<StoreReviewInterface> => {
  console.log(body);
  return StoreReviewModel.findOneAndUpdate(
    {
      _id: commentId,
      userId,
    },
    {
      $set: body,
    },
    {
      returnDocument: 'after',
    },
  );
};

export const updateStoreOwnerReview = async (
  body: StoreOwnerReviewInterface,
  commentId: mongoose.Schema.Types.ObjectId,
  ownerId: mongoose.Schema.Types.ObjectId,
): Promise<StoreReviewInterface> => {
  return StoreReviewModel.findOneAndUpdate(
    {
      _id: commentId,
      ownerId,
    },
    {
      $set: body,
    },
    {
      returnDocument: 'after',
    },
  );
};
