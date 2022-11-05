export interface OrderInterface {
  storeId: string;
  menu: [
    {
      name: string;
      number: number;
      totalAmount: number;
    },
  ];
  customerId: string;
  status: Status;
  minDeliveryTime: number;
  maxDeliveryTime: number;
}

export type DeliveryInterface = Omit<OrderInterface, 'customer'>;

export enum Status {
  'confirmingOrder' = 'confirmingOrder',
  'confirmedOrder' = 'confirmedOrder',
  'cooking' = 'cooking',
  'pickUp' = 'pickUp',
  'delivered' = 'delivered',
}

//status => 주문 확인중 => 주문 확인 => 요리중 => 픽업 => 배달 완료
