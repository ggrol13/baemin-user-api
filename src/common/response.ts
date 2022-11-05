import {
  ResponseBodyInterface,
  ResponseInterface,
} from './types/response.interface';

export const response = <T>(
  status: number,
  data: ResponseBodyInterface<T>,
): ResponseInterface => {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Header': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

export const htmlResponse = <T>(
  status: number,
  data: string,
): ResponseInterface => {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Header': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'text/html',
    },
    body: data,
  };
};

export const UnAuthorizedError = (): ResponseInterface => {
  return response<string>(401, {
    result: false,
    message: 'fail',
    body: 'UnAuthorizedError',
  });
};
