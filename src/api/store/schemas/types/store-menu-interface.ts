import { Document } from 'mongoose';

export interface MenuInterface extends Document {
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
