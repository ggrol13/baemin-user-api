export interface ShoppingInterface {
  name: string;
  videoPath: string;
  product: [
    {
      name: string;
      price: string;
      imgPath: [string];
      count: number;
    },
  ];
}

export interface ShoppingLiveInterface extends ShoppingInterface {
  examineYN: boolean;
  shoppingLiveCategoryId: string;
  encoreYN: boolean;
  funYN: boolean;
  dessertYN: boolean;
  deliciousYN: boolean;
}

export interface ShoppingLiveWithOthersInterface {
  shoppingLive: ShoppingLiveInterface;
  otherLives: ShoppingInterface[];
}
