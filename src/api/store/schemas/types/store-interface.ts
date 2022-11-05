import { Model } from 'mongoose';

export interface StoreInterface {
  name: string;
  phone: string;
  address: string;
  minimumPrice: number;
  paymentMethod: string;
  deliveryTime: string;
  deliveryTip: number[];
  info: string;
  menuCategory: [
    {
      isRepresent: { type: boolean; default: false };
      name: { type: string; required: true };
      menu: [
        {
          name: { type: string; required: true };
          price: { type: number; required: true };
          imgPath: string;
          options: [
            {
              name: string;
              price: number;
            },
          ];
        },
      ];
    },
  ];
}

export interface StoreAvgInterface extends StoreInterface {
  avgScore: number;
}

export type StoreModelInterface = Model<StoreInterface>;
