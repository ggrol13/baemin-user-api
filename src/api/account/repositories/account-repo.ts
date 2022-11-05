import { AccountModel } from '../schemas/account-schema';
import * as crypto from 'crypto';
import { AccountInterface } from '../schemas/types/account-interface';

const hash = (password): string => {
  return crypto.createHash('sha256').update(password).digest('base64');
};

export const saveLocalRegister = ({
  username,
  email,
  password,
  jwtLevel,
  storeId,
}) => {
  // 나중에 고치기
  const account = new AccountModel({
    profile: {
      username,
      // thumbnail 값을 설정하지 않으면 기본값으로 설정됩니다.
    },
    email,
    password: hash(password),
    jwtLevel,
    storeId,
  });

  return account.save();
};

export const findAccountByEmail = (email): Promise<AccountInterface> => {
  return AccountModel.findOne({ email }).exec();
};

export const findAccountById = (id): Promise<AccountInterface> => {
  return AccountModel.findOne({ _id: id }).exec();
};

export const validatePassword = (password, account): boolean => {
  // 함수로 전달받은 password 의 해시값과, 데이터에 담겨있는 해시값과 비교를 합니다.
  const hashed = hash(password);
  return account.password === hashed;
};
