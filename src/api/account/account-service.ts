import * as Joi from 'joi';
import {
  findAccountByEmail,
  saveLocalRegister,
  validatePassword,
} from './repositories/account-repo';
import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  AccessTokenInterface,
  AccountServiceInterface,
  ProfileInterface,
} from './token/types/token.interface';
import { generateAccessToken, generateRefreshToken } from './token/token';
import { findRefreshToken, updateRefreshToken } from './token/token-repo';
import { RefreshTokenModel } from './token/token-schema';

export const registerService = async (
  event: APIGatewayProxyEvent,
): Promise<
  AccountServiceInterface<string> | AccountServiceInterface<ProfileInterface>
> => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    jwtLevel: Joi.number().integer().min(1).max(3).required(),
    storeId: Joi.string(),
  });

  const result = schema.validate(JSON.parse(event.body));

  if (result.error) {
    return { result: false, body: 'result error' };
  }

  // 계정 생성
  let account = null;
  try {
    account = await saveLocalRegister(JSON.parse(event.body));
  } catch (e) {
    return { result: false, body: 'account error' };
  }

  return { result: true, body: account.profile };
};

export const loginService = async (
  event: APIGatewayProxyEvent,
): Promise<
  | AccountServiceInterface<string>
  | AccountServiceInterface<AccessTokenInterface>
> => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(JSON.parse(event.body));

  if (result.error) {
    return { result: false, body: 'result error' };
  }

  const { email, password } = JSON.parse(event.body);
  let account = null;
  try {
    // 이메일로 계정 찾기
    account = await findAccountByEmail(email);
  } catch (e) {
    return { result: false, body: 'account error' };
  }

  if (!account || !validatePassword(password, account)) {
    // 유저가 존재하지 않거나 || 비밀번호가 일치하지 않으면
    return { result: false, body: 'forbidden' };
  }

  //refreshToken 없으면 만들고 있으면 업데이트
  const refreshToken = generateRefreshToken(account._id, account.jwtLevel);
  if (!(await findRefreshToken(account._id))) {
    const tokenModel = new RefreshTokenModel(refreshToken);
    await tokenModel.save();
  } else {
    await updateRefreshToken(refreshToken);
  }
  const accessToken = {
    accessToken: generateAccessToken(account._id, account.jwtLevel),
    uuid: refreshToken.uuid,
  };

  return { result: true, body: accessToken };
};
