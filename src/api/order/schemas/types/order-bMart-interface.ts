export interface OrderBMartInterface {
  userId: string;
  products: [];
  status: Status;
  minDeliveryTime: number;
  maxDeliveryTime: number;
}

export enum Status {
  'confirmingOrder' = 'confirmingOrder',
  'confirmedOrder' = 'confirmedOrder',
  'cooking' = 'cooking',
  'pickUp' = 'pickUp',
  'delivered' = 'delivered',
}
