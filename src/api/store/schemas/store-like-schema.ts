import mongoose from 'mongoose';

export const StoreLikeSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  userId: { type: String, required: true },
});
