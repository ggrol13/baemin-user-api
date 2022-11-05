import mongoose, { model } from 'mongoose';
import { StoreLikeModelInterface } from './types/store-like-interface';

export const StoreLikeSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  userId: { type: String, required: true },
});

export const StoreLikeModel = model<StoreLikeModelInterface>(
  'StoreLike',
  StoreLikeSchema,
  'storeLikes',
);
