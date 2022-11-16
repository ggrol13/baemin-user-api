import mongoose, { model } from 'mongoose';
import { ProductInterface } from './types/b-mart-interface';

const productSchema = new mongoose.Schema({
  examineYN: Boolean,
  name: String,
  price: Number,
  imgPath: [{ path: String, imageName: String, number: Number }],
  deliveryTime: String,
  information: String,
  infoDetail: String,
  refundReturn: {
    deliveryInfo: String,
    sellerInfo: String,
    refundReturnInfo: String,
  },
  categoryId: mongoose.Schema.Types.ObjectId,
});

export const ProductModel = model<ProductInterface>(
  'bMartProduct',
  productSchema,
  'bMartProduct',
);
