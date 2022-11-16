export interface OrderShoppingLiveInterface {
  liveId: string;
  userId: string;
  products: [];
  status: Status;
}

export enum Status {
  'confirmingOrder' = 'confirmingOrder',
  'confirmedOrder' = 'confirmedOrder',
  'pickUp' = 'pickUp',
  'delivered' = 'delivered',
}
