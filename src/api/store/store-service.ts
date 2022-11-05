import { findStoreCategoryModel } from './repositories/store-category-repo';
import {
  findStoreModelById,
  findWholeMenu,
  findWholeStoreModel,
} from './repositories/store-repo';
import { StoreCategoryInterface } from './schemas/types/store-category-interface';
import {
  StoreAvgInterface,
  StoreInterface,
  StoreModelInterface,
} from './schemas/types/store-interface';
import { MenuInterface } from './schemas/types/store-menu-interface';
import {
  StoreOwnerReviewInterface,
  StoreReviewInterface,
  StoreReviewModelInterface,
  StoreUserReviewInterface,
} from './schemas/types/store-review-interface';
import { findAccountById } from '../account/repositories/account-repo';
import {
  averageStoreScore,
  deleteStoreOwnerReview,
  deleteStoreUserReview,
  findStoreReview,
  saveOwnerReview,
  saveStoreUserReview,
  updateStoreOwnerReview,
  updateStoreUserReview,
} from './repositories/store-review-repo';
import {
  checkStoreLike,
  deleteStoreLike,
} from './repositories/store-like-repo';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { StoreLikeModelInterface } from './schemas/types/store-like-interface';
import {
  StoreBasketBodyInterface,
  StoreBasketModelInterface,
} from './schemas/types/store-basket-interface';
import {
  deleteStoreBasketAll,
  deleteStoreBasketOne,
  findStoreBasketByStoreId,
  insertStoreBasket,
} from './repositories/store-basket-repo';

export const getStoreCategoryService = async (
  storeCategoryId,
): Promise<StoreCategoryInterface[]> => {
  return await findStoreCategoryModel(storeCategoryId);
};

export const getWholeStoreService = async (): Promise<StoreInterface[]> => {
  return await findWholeStoreModel();
};

export const getStoreService = async (storeId): Promise<StoreAvgInterface> => {
  const avg = await averageStoreScore(storeId);
  const store: StoreModelInterface = await findStoreModelById(storeId);
  const parsed = JSON.parse(JSON.stringify(store));
  parsed.avgScore = avg[0].storeAvg;
  return parsed;
};

export const getMenuService = async (storeId): Promise<MenuInterface[]> => {
  return await findWholeMenu(storeId);
};

export const getStoreReviewService = async (): Promise<
  StoreReviewModelInterface[]
> => {
  return await findStoreReview();
};

export const storeReviewService = async (
  body: StoreUserReviewInterface,
  userId: string,
): Promise<StoreReviewModelInterface> => {
  body.userId = userId;
  body.createdAt = new Date();
  return await saveStoreUserReview(body);
};

const checkError = <T>(data: T) => {
  return data != null ? data : false;
  // : Promise.reject(
  //     response(400, {
  //       result: false,
  //       message: 'fail',
  //       body: 'Unauthorized Error',
  //     }),
  //   );
};

export const storeOwnerReviewService = async (
  body: StoreOwnerReviewInterface,
  ownerId: string,
  commentId: string,
): Promise<StoreReviewInterface | boolean> => {
  const { ownerComment } = body;
  ownerComment.owner = '사장님';
  ownerComment.ownerId = ownerId;
  ownerComment.createdAt = new Date();
  const { storeId } = await findAccountById(ownerId);
  if (!storeId) {
    return false;
  }
  const review = await saveOwnerReview(body, storeId, commentId).then((data) =>
    checkError(data),
  );
  return review;
};

export const storeUserReviewDeleteService = async (
  commentId: string,
  userId: string,
): Promise<boolean> => {
  try {
    await deleteStoreUserReview(commentId, userId);
  } catch (e) {
    return false;
  }
  return true;
};

export const storeOwnerReviewDeleteService = async (
  commentId: string,
  ownerId: string,
): Promise<boolean> => {
  try {
    await deleteStoreOwnerReview(commentId, ownerId);
  } catch (e) {
    return false;
  }
  return true;
};

export const storeUserReviewModifyService = async (
  body: StoreUserReviewInterface,
  commentId: string,
  userId: string,
): Promise<StoreReviewInterface> => {
  body.userId = userId;
  body.createdAt = new Date();
  return await updateStoreUserReview(body, commentId, userId);
};

export const storeOwnerReviewModifyService = async (
  body: StoreOwnerReviewInterface,
  commentId: string,
  ownerId: string,
): Promise<StoreReviewInterface> => {
  body.ownerComment.owner = '사장님';
  body.ownerComment.ownerId = ownerId;
  body.ownerComment.createdAt = new Date();
  return await updateStoreOwnerReview(body, commentId, ownerId);
};

export const storeLikeService = async (
  event: APIGatewayProxyEvent,
): Promise<StoreLikeModelInterface> => {
  return await checkStoreLike(event.pathParameters.storeId, event['userId']);
};

export const storeLikeDeleteService = async (event: APIGatewayProxyEvent) => {
  //에러처리
  const a = await deleteStoreLike(
    event.pathParameters.storeId,
    event['userId'],
  ).then((data) => checkError(data));
  console.log(a);
  return a;
};

export const storeBasketService = async (
  body: StoreBasketBodyInterface,
  storeId: string,
  menuCategoryId: string,
  menuId: string,
  userId: string,
): Promise<StoreBasketModelInterface | string> => {
  const basket = await findStoreBasketByStoreId();
  if (basket && basket['storeId'] !== storeId) {
    await deleteStoreBasketAll();
    return 'deleted';
  }
  body.storeId = storeId;
  body.userId = userId;
  const store = await findStoreModelById(storeId);
  const menuCategory = store['menuCategory'].filter(
    (category) => category['_id'].toString() === menuCategoryId,
  )[0];
  const menu = menuCategory.menu.filter(
    (category) => category['_id'].toString() === menuId,
  )[0];

  body.menu = JSON.parse(JSON.stringify(menu));

  return await insertStoreBasket(body);
};

export const storeBasketDeleteService = async (event: APIGatewayProxyEvent) => {
  await deleteStoreBasketOne(event.pathParameters.basketId, event['userId']);
};
