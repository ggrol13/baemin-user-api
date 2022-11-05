export const orderEvents = [
  {
    http: {
      method: 'post',
      path: 'order/{storeId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/confirm/{orderId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/pickUp/{orderId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/deliveryEnd/{orderId}',
    },
  },
];
