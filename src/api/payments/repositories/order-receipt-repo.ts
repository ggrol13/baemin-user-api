import { OrderReceiptModel } from '../schemas/order-receipt-schema';
import { OrderReceiptInterface } from '../schemas/types/order-receipt.interface';

export const OrderReceiptSave = async (
  data,
): Promise<OrderReceiptInterface> => {
  const model = new OrderReceiptModel(data);
  return await model.save();
};
