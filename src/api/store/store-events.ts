export const storeEvents = [
  {
    http: {
      method: 'get',
      path: 'store/category/{storeCategoryId}',
    },
  },
  {
    http: {
      method: 'get',
      path: 'store',
    },
  },
  {
    http: {
      method: 'get',
      path: 'store/{storeId}',
    },
  },
  {
    http: {
      method: 'get',
      path: 'store/menu/{storeId}',
    },
  },

  //review
  {
    http: {
      method: 'post',
      path: 'store/review',
    },
  },
  {
    http: {
      method: 'delete',
      path: 'store/review/{commentId}',
    },
  },
  {
    http: {
      method: 'put',
      path: 'store/review/{commentId}',
    },
  },
  {
    http: {
      method: 'get',
      path: 'store/review',
    },
  },

  //like
  {
    http: {
      method: 'post',
      path: 'store/like/{storeId}',
    },
  },
  {
    http: {
      method: 'delete',
      path: 'store/like/{storeId}',
    },
  },
  //basket
  {
    http: {
      method: 'post',
      path: 'store/basket/{storeId}/{menuCategoryId}/{menuId}',
    },
  },
  {
    http: {
      method: 'delete',
      path: 'store/basket/{storeId}',
    },
  },
];
