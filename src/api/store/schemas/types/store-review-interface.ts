import mongoose, { Document, Model } from 'mongoose';

export interface BaseStoreReviewInterface {
  score: number;
  storeId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  comment: string;
  menuId: mongoose.Schema.Types.ObjectId;
  flag: boolean;
  ownerComment: {
    owner: string;
    createdAt: Date;
    comment: string;
    ownerId: mongoose.Schema.Types.ObjectId;
  };
  createdAt: Date;
  imgPath: string[];
}

export type StoreUserReviewInterface = Omit<
  StoreReviewInterface,
  'ownerComment'
>;

export interface StoreOwnerReviewInterface {
  ownerComment: {
    owner: string;
    createdAt: Date;
    comment: string;
    ownerId: mongoose.Schema.Types.ObjectId;
  };
}

export interface StoreReviewInterface
  extends BaseStoreReviewInterface,
    Document {}

export type StoreReviewModelInterface = Model<StoreReviewInterface>;
