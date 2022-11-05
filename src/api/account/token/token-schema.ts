import mongoose from 'mongoose';
import { RefreshTokenInterface } from './types/token.interface';

const RefreshToken = new mongoose.Schema({
  refreshToken: String,
  userId: mongoose.Schema.Types.ObjectId,
  uuid: String,
});

export const RefreshTokenModel = mongoose.model<RefreshTokenInterface>(
  'RefreshToken',
  RefreshToken,
  'RefreshToken',
);
