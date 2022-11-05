import { MiddlewareObj } from '@middy/core';
import { verifyAccessToken } from '../api/account/token/token';
import { UnAuthorizedError } from '../common/response';

export const jwtMiddleware = (): MiddlewareObj => {
  //유저인지 사장님인지 구분
  const jwtMiddlewareBefore = async (request) => {
    const { event } = request;
    const validateAccessToken = await verifyAccessToken(
      event.headers.Authorization,
    );
    if (!validateAccessToken) {
      return UnAuthorizedError();
    }
    event['jwtLevel'] = validateAccessToken['jwtLevel'];
    event['userId'] = validateAccessToken['userId'];
  };
  const jwtMiddlewareAfter = async (request) => request.response;

  return {
    before: jwtMiddlewareBefore,
    after: jwtMiddlewareAfter,
  };
};
