import mongoose from 'mongoose';
import { AccountInterface } from './types/account-interface';

const Account = new mongoose.Schema<AccountInterface>({
  profile: {
    username: String,
    thumbnail: {
      type: String,
      default: '/static/images/default_thumbnail.png',
    },
  },
  email: { type: String },
  // 소셜 계정으로 회원가입을 할 경우에는 각 서비스에서 제공되는 id 와 accessToken 을 저장합니다
  social: {
    facebook: {
      id: String,
      accessToken: String,
    },
    google: {
      id: String,
      accessToken: String,
    },
  },
  password: String, // 로컬계정의 경우엔 비밀번호를 해싱해서 저장합니다
  jwtLevel: { type: Number, default: 0 },
  storeId: mongoose.Schema.Types.ObjectId,
  thoughtCount: { type: Number, default: 0 }, // 서비스에서 포스트를 작성 할 때마다 1씩 올라갑니다
  createdAt: { type: Date, default: Date.now },
});

export const AccountModel = mongoose.model<AccountInterface>(
  'Account',
  Account,
  'Account',
);
