import mongoose, { Document, Model } from 'mongoose';

export interface BaseStoreReviewInterface {
  score: number;
  storeId: mongoose.Schema.Types.ObjectId;
  userId: string;
  comment: string;
  menuId: string;
  flag: boolean;
  ownerComment: {
    owner: string;
    createdAt: Date;
    comment: string;
    ownerId: string;
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
    ownerId: string;
  };
}

export interface StoreReviewInterface
  extends BaseStoreReviewInterface,
    Document {}

export type StoreReviewModelInterface = Model<StoreReviewInterface>;
