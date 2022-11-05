import { Document, Model } from 'mongoose';

export interface BaseStoreCategoryInterface {
  name: string;
  imgPath: string;
  storeId: string[];
}

export interface StoreCategoryInterface
  extends BaseStoreCategoryInterface,
    Document {}

export type StoreCategoryModelInterface = Model<StoreCategoryInterface>;
