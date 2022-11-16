import { liveCalenderModelSchema } from '../schemas/shopping-live-calender-schema';

export const findLiveCalender = (date) => {
  const tomorrow = date;
  tomorrow.setDate(tomorrow.getDate() + 1);
  return liveCalenderModelSchema.find({
    date: { $gte: date, $lte: tomorrow },
  });
};
