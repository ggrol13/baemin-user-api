export const orderEvents = [
  //storeOrder
  {
    http: {
      method: 'post',
      path: 'order/store/{storeId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/store/confirm/{orderId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/store/pickUp/{orderId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/store/deliveryEnd/{orderId}',
    },
  },
  //bMartOrder
  {
    http: {
      method: 'post',
      path: 'order/bMart',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/bMart/confirm/{orderId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/bMart/pickUp/{orderId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/bMart/deliveryEnd/{orderId}',
    },
  },
  //shoppingLiveOrder
  {
    http: {
      method: 'post',
      path: 'order/shoppingLive/{shoppingLiveId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/shoppingLive/confirm/{orderId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/shoppingLive/pickUp/{orderId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'order/shoppingLive/deliveryEnd/{orderId}',
    },
  },
];
