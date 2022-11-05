import { RefreshTokenModel } from './token-schema';
import { RefreshTokenInterface } from './types/token.interface';

export const findRefreshToken = async (
  userId: string,
): Promise<RefreshTokenInterface> => {
  return RefreshTokenModel.findOne({ userId });
};

export const updateRefreshToken = async ({
  userId,
  refreshToken,
  uuid,
}: RefreshTokenInterface): Promise<void> => {
  await RefreshTokenModel.findOneAndUpdate(
    { userId },
    { refreshToken, uuid },
  ).exec();
};

export const updateUuid = async (
  userId: string,
  uuid: string,
): Promise<string> => {
  await RefreshTokenModel.findOneAndUpdate({ userId }, { uuid });
  return uuid;
};

export const deleteRefreshToken = () => {
  return RefreshTokenModel.deleteOne();
};
