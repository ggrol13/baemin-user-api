import { response, UnAuthorizedError } from '../../common/response';
import { ResponseInterface } from '../../common/types/response.interface';
import { verifyAccessToken, verifyRefreshToken } from './token/token';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { loginService, registerService } from './account-service';
import {
  AccessTokenInterface,
  ProfileInterface,
  ValidatedTokenInterface,
} from './token/types/token.interface';

// 회원가입
export const registerController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const registerResult = await registerService(event);

  if (!registerResult.result) {
    return response<string | ProfileInterface>(400, {
      result: false,
      message: 'failed',
      body: registerResult.body,
    });
  }

  return response<string | ProfileInterface>(200, {
    result: true,
    message: 'success',
    body: registerResult.body,
  });
};

// 로그인
export const loginController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  // 데이터 검증
  const login = await loginService(event);

  if (!login.result) {
    return response<AccessTokenInterface | string>(400, {
      result: false,
      message: 'failed',
      body: login.body,
    });
  }

  return response<AccessTokenInterface | string>(200, {
    result: true,
    message: 'success',
    body: login.body, //accessToken을 가져오기
  });
};

export const verifyAccessController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const validate = verifyAccessToken(event.headers.Authorization);

  if (!validate) {
    return UnAuthorizedError();
  }

  return response<ValidatedTokenInterface | boolean>(200, {
    result: true,
    message: 'success',
    body: validate,
  });
};

export const refreshTokenController = async (
  event: APIGatewayProxyEvent,
): Promise<ResponseInterface> => {
  const validate = await verifyRefreshToken(
    event.headers.Authorization,
    JSON.parse(event.body).uuid,
  );

  if (!validate) {
    return UnAuthorizedError();
  }

  return response<AccessTokenInterface | boolean>(200, {
    result: true,
    message: 'success',
    body: validate,
  });
};
