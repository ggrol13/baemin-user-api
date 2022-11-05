import { Document, Model } from 'mongoose';

export interface BaseStoreLikeInterface {
  storeId: string;
  userId: string;
}

export interface StoreLikeInterface extends BaseStoreLikeInterface, Document {}

export type StoreLikeModelInterface = Model<StoreLikeInterface>;
