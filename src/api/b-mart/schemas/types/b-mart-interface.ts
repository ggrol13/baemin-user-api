import { Model } from 'mongoose';

export interface ProductCategoryInterface {
  name: string;
  imgPath: string;
  productId: string[];
}

export type ProductCategoryModelInterface = Model<ProductCategoryInterface>;
