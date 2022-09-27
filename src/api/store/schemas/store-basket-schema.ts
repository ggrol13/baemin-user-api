import mongoose from 'mongoose';

export const StoreBasketSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  userId: { type: String, required: true },
  count: { type: Number, required: true },
  menu: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      imgPath: { type: String, required: true },
      options: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  ],
});
