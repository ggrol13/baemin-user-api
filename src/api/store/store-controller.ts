import {
  getMenuService,
  getStoreService,
  getStoreCategoryService,
  storeUserReviewModifyService,
  storeOwnerReviewModifyService,
  storeOwnerReviewDeleteService,
  storeUserReviewDeleteService,
  storeOwnerReviewService,
  getStoreReviewService,
  storeLikeService,
  storeLikeDeleteService,
  storeReviewService,
  getWholeStoreService,
  storeBasketService,
  storeBasketDeleteService,
} from './store-service';
import { response } from '../../common/response';
import { StoreCategoryInterface } from './schemas/types/store-category-interface';
import { ResponseInterface } from '../../common/types/response.interface';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  StoreAvgInterface,
  StoreInterface,
} from './schemas/types/store-interface';
import { MenuInterface } from './schemas/types/store-menu-interface';
import { StoreLikeModelInterface } from './schemas/types/store-like-interface';
import { StoreBasketModelInterface } from './schemas/types/store-basket-interface';

export const getStoreCategoryController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const storeCategories: StoreCategoryInterface[] =
    await getStoreCategoryService(event.pathParameters.storeCategoryId);

  return response<StoreCategoryInterface[]>(200, {
    result: true,
    message: 'success',
    body: storeCategories,
  });
};

export const getWholeStoreController = async (): Promise<ResponseInterface> => {
  const stores: StoreInterface[] = await getWholeStoreService();

  return response<StoreInterface[]>(200, {
    result: true,
    message: 'success',
    body: stores,
  });
};

export const getStoreController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const stores = await getStoreService(event.pathParameters.storeId);

  return response<StoreAvgInterface>(200, {
    result: true,
    message: 'success',
    body: stores,
  });
};

export const getMenuController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const menus: MenuInterface[] = await getMenuService(
    event.pathParameters.storeId,
  );

  return response<MenuInterface[]>(200, {
    result: true,
    message: 'success',
    body: menus,
  });
};

export const getStoreReviewController =
  async (): Promise<ResponseInterface> => {
    const review = await getStoreReviewService();
    return response(200, {
      result: true,
      message: 'success',
      body: review,
    });
  };

export const storeReviewController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  //분기처리
  let review;
  if (event['jwtLevel'] === 1) {
    review = await storeReviewService(JSON.parse(event.body), event['userId']);
  } else {
    const { commentId, ...rest } = JSON.parse(event.body);
    review = await storeOwnerReviewService(rest, event['userId'], commentId);
  }

  if (!review) {
    return response(401, {
      result: false,
      message: 'fail',
      body: 'something error',
    });
  }

  //안되는 경우, 중복확인 같은 상점에 같은 메뉴id가 있으면 false

  return response(200, {
    result: true,
    message: 'success',
    body: review,
  });
};

export const storeReviewDeleteController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  let deleteReview;
  if (event['jwtLevel'] === 1) {
    deleteReview = await storeUserReviewDeleteService(
      event.pathParameters.commentId,
      event['userId'],
    );
  } else {
    deleteReview = await storeOwnerReviewDeleteService(
      event.pathParameters.commentId,
      event['userId'],
    );
  }

  if (!deleteReview) {
    return response(401, {
      result: false,
      message: 'fail',
      body: 'something Error',
    });
  }

  return response(200, {
    result: true,
    message: 'success',
    body: 'deleted',
  });
};

export const storeReviewModifyController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  let updateReview;
  if (event['jwtLevel'] === 1) {
    updateReview = await storeUserReviewModifyService(
      JSON.parse(event.body),
      event.pathParameters.commentId,
      event['userId'],
    );
  } else {
    updateReview = await storeOwnerReviewModifyService(
      JSON.parse(event.body),
      event.pathParameters.commentId,
      event['userId'],
    );
  }
  if (!updateReview) {
    return response(500, {
      result: false,
      message: 'fail',
      body: 'something Error',
    });
  }

  return response(200, {
    result: true,
    message: 'success',
    body: updateReview,
  });
};

export const storeLikeController = async (event: APIGatewayProxyEvent) => {
  const like = await storeLikeService(event);
  if (!like) {
    return response(401, {
      result: false,
      message: 'fail',
      body: 'something Error',
    });
  }

  return response<StoreLikeModelInterface>(200, {
    result: true,
    message: 'success',
    body: like,
  });
};

export const storeLikeDeleteController = async (
  event: APIGatewayProxyEvent,
) => {
  const deleted = await storeLikeDeleteService(event);
  if (!deleted) {
    return response(401, {
      result: false,
      message: 'fail',
      body: 'something Error',
    });
  }
  return response(200, {
    result: true,
    message: 'success',
    body: 'deleted',
  });
};

export const storeBasketController = async (event: APIGatewayProxyEvent) => {
  const basket = await storeBasketService(
    JSON.parse(event.body),
    event.pathParameters.storeId,
    event.pathParameters.menuCategoryId,
    event.pathParameters.menuId,
    event['userId'],
  );
  if (!basket) {
    return response(401, {
      result: false,
      message: 'fail',
      body: 'something Error',
    });
  }

  return response<StoreBasketModelInterface | string>(200, {
    result: true,
    message: 'success',
    body: basket,
  });
};

export const storeBasketDeleteController = async (
  event: APIGatewayProxyEvent,
) => {
  await storeBasketDeleteService(event);
  return response(200, {
    result: true,
    message: 'success',
    body: 'deleted',
  });
};
