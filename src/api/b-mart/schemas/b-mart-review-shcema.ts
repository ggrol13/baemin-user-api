import mongoose, { model } from 'mongoose';
import { BMartReviewInterface } from './types/b-mart-review-interface';

const BMartReviewSchema = new mongoose.Schema({
  score: Number,
  productId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  comment: String,
  createdAt: Date,
  imgPath: [{ type: String }],
});

export const BMartReviewModel = model<BMartReviewInterface>(
  'bMartReview',
  BMartReviewSchema,
  'bMartReview',
);
