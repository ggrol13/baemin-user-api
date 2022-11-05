import mongoose, { model } from 'mongoose';
import { StoreReviewModelInterface } from './types/store-review-interface';

export const StoreReviewSchema = new mongoose.Schema({
  score: Number,
  storeId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  comment: { type: String, required: true },
  menuId: { type: mongoose.Schema.Types.ObjectId, required: true },
  imgPath: [{ type: String, required: true }],
  createdAt: Date,
  flag: Boolean,
  ownerComment: {
    owner: String,
    createdAt: Date,
    comment: String,
    ownerId: mongoose.Schema.Types.ObjectId,
  },
});

export const StoreReviewModel = model<StoreReviewModelInterface>(
  'StoreReview',
  StoreReviewSchema,
  'StoreReview',
);
