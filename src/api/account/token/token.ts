import { decode, sign, verify } from 'jsonwebtoken';
import { findRefreshToken, updateUuid } from './token-repo';
import {
  AccessTokenInterface,
  RefreshTokenInterface,
  ValidatedTokenInterface,
} from './types/token.interface';
import { v4 as uuidv4 } from 'uuid';

const secretKey = 'mySecretKey';

export const generateRefreshToken = (
  userId: string,
  jwtLevel: number,
): RefreshTokenInterface => {
  const uuid = uuidv4();
  const refreshToken = sign({ userId, jwtLevel }, secretKey, {
    expiresIn: '14d',
  });
  return { refreshToken, userId, uuid };
};

export const generateAccessToken = (
  userId: string,
  jwtLevel: number,
): string => {
  const token = sign({ userId, jwtLevel }, secretKey, { expiresIn: '14d' });
  return token;
};

export const verifyAccessToken = (
  token: string,
): ValidatedTokenInterface | boolean => {
  token = token.split(' ')[1];
  let decoded;

  try {
    decoded = verify(token, secretKey);
  } catch (e) {
    return false;
  }
  return decoded;
};

export const verifyRefreshToken = async (
  token: string,
  tokenUuid: string,
): Promise<AccessTokenInterface | boolean> => {
  token = token.split(' ')[1];
  let newAccessToken;

  try {
    const decoded = decode(token);
    const { uuid, refreshToken } = await findRefreshToken(decoded['userId']);
    if (uuid !== tokenUuid) {
      return false;
    }
    verify(refreshToken, secretKey);
    const userId = decoded['userId'];
    const jwtLevel = decoded['jwtLevel'];
    newAccessToken = {
      accessToken: sign({ userId, jwtLevel }, secretKey, { expiresIn: '30m' }),
      uuid: await updateUuid(decoded['userId'], uuidv4()),
    };
  } catch (e) {
    return false;
  }
  return newAccessToken;
};
