import { Model } from 'mongoose';

export interface StoreBasketInterface {
  storeId: string;
  userId: string;
  count: number;
  menu: [
    {
      name: string;
      price: number;
      imgPath: string;
      options: [
        {
          name: string;
          price: number;
        },
      ];
    },
  ];
}

export type StoreBasketBodyInterface = Omit<
  StoreBasketInterface,
  'storeId, userId'
>;

export type StoreBasketModelInterface = Model<StoreBasketInterface>;
