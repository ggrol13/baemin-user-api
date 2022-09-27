import { Document, Model } from 'mongoose';

export interface BasicStoreCategoryInterface {
  name: string;
  imgPath: string;
  storeId: string[];
}

export interface StoreCategoryInterface
  extends BasicStoreCategoryInterface,
    Document {}

export type StoreCategoryModelInterface = Model<StoreCategoryInterface>;
