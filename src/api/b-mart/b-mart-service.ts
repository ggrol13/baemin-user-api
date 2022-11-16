import {
  aggregateProductCategory,
  aggregateProductReview,
  deleteBMartReview,
  findProductById,
  findProductCategories,
  findProductDetail,
  saveBMartReview,
} from './repositories/b-mart-repo';
import { deleteBasket, saveBasket } from './repositories/b-mart-basket-repo';
import { BMartBasketInterface } from './schemas/types/b-mart-basket-interface';
import mongoose from 'mongoose';

export const getProductCategoryService = async () => {
  return await findProductCategories();
};

export const getAllProductService = async () => {
  return await aggregateProductReview();
};

export const getProductService = async (productId) => {
  //카테고리 id가져온다

  const product = await findProductDetail(productId);
  const category = await aggregateProductCategory(product.categoryId);
  return category;
};

export const basketService = async (
  body,
  productId,
  userId,
): Promise<BMartBasketInterface> => {
  const product = await findProductById(productId);
  body.productName = product.name;
  body.productId = productId;
  body.price = product.price;
  body.userId = userId;
  return await saveBasket(body);
};

export const deleteBasketService = async (
  basketId,
  userId,
): Promise<BMartBasketInterface> => {
  return await deleteBasket(basketId, userId);
};

export const bMartReviewService = async (body, userId, productId) => {
  body.productId = productId;
  body.userId = userId;
  body.createdAt = new Date();
  return await saveBMartReview(body);
};

export const deleteBMartReviewService = async (
  reviewId: string,
  userId: mongoose.Schema.Types.ObjectId,
) => {
  return await deleteBMartReview(reviewId, userId);
};
