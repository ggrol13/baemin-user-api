export interface liveCalenderInterface {
  date: Date;
  detail: [
    {
      productId: string;
      name: string;
      info: string;
      date: Date;
    },
  ];
}
