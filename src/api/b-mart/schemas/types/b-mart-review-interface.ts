import mongoose from 'mongoose';

export interface BMartReviewInterface {
  score: number;
  productId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
  imgPath: string[];
}
