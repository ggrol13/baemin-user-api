import mongoose from 'mongoose';

export const StoreReviewSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  userId: { type: String, required: true },
  comment: { type: String, required: true },
  menuId: { type: String, required: true },
  ownerComment: { type: String, required: true },
  createdAt: Date,
  imgPath: [{ type: String, required: true }],
});
