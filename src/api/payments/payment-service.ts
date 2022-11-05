import { OrderReceiptSave } from './repositories/order-receipt-repo';
import { OrderReceiptInterface } from './schemas/types/order-receipt.interface';

export const orderReceiptService = async (
  data,
): Promise<OrderReceiptInterface> => {
  return await OrderReceiptSave(data);
};
