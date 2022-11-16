import mongoose from 'mongoose';

export interface ProductInterface {
  examineYN: boolean;
  name: string;
  price: number;
  imgPath: [{ path: string; imageName: string; number: number }];
  deliveryTime: string;
  information: string;
  infoDetail: string;
  refundReturn: {
    deliveryInfo: string;
    sellerInfo: string;
    refundReturnInfo: string;
  };
  categoryId: mongoose.Types.ObjectId;
}
