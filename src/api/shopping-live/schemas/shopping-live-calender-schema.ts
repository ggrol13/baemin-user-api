import mongoose, { model } from 'mongoose';
import { liveCalenderInterface } from './types/shopping-live-calender-interface';

const liveCalender = new mongoose.Schema({
  date: Date,
  detail: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      info: String,
      date: Date,
    },
  ],
});

export const liveCalenderModelSchema = model<liveCalenderInterface>(
  'liveCalender',
  liveCalender,
  'liveCalender',
);
