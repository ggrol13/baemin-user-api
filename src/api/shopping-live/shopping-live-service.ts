import {
  aggregateShoppingLives,
  findCategoryWithShoppingLiveByName,
  findLivesInCategories,
  findShoppingLiveById,
  findShoppingLives,
} from './repositories/shopping-live-repo';
import { findLiveCalender } from './repositories/shopping-live-calender-repo';
import { ShoppingLiveWithOthersInterface } from './schemas/types/shopping-live-interface';

export const shoppingLiveService = async (category) => {
  if (!category) {
    return findShoppingLives();
  }
  return await findCategoryWithShoppingLiveByName(category);
};

export const shoppingLiveDetailService = async (liveId) => {
  const shoppingLive = await findShoppingLiveById(liveId);
  const lives = await aggregateShoppingLives(
    shoppingLive.shoppingLiveCategoryId,
    liveId,
  );
  const shoppingWithOthers: ShoppingLiveWithOthersInterface = {
    shoppingLive,
    otherLives: lives,
  };
  return shoppingWithOthers;
};

export const livesInCategoriesService = async (name) => {
  return findLivesInCategories(name);
};

export const liveCalenderService = async (date) => {
  date = new Date(date);
  return findLiveCalender(date);
};
