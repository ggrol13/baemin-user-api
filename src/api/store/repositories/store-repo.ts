import { Document, Model, model } from 'mongoose';
import { storeSchema } from '../schemas/store-schema';

export const StoreModel = model<StoreInterface>('Store', storeSchema, 'stores');

export const findStoreModel = async () => await StoreModel.find();

interface BasicStoreInterface {
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

interface StoreInterfaceDocument extends BasicStoreInterface, Document {}

export type StoreInterface = Model<StoreInterfaceDocument>;
