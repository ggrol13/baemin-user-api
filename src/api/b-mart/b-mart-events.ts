export const bMartEvents = [
  {
    http: {
      method: 'get',
      path: 'bMart/productCategory',
    },
  },
  {
    http: {
      method: 'get',
      path: 'bMart/allProducts',
    },
  },
  {
    http: {
      method: 'get',
      path: 'bMart/product/{productId}',
    },
  },
  //basket
  {
    http: {
      method: 'post',
      path: 'bMart/basket/{productId}',
    },
  },
  {
    http: {
      method: 'delete',
      path: 'bMart/basket/{basketId}',
    },
  },
  //review
  {
    http: {
      method: 'post',
      path: 'bMart/review/{productId}',
    },
  },
  {
    http: {
      method: 'delete',
      path: 'bMart/review/{reviewId}',
    },
  },
];
