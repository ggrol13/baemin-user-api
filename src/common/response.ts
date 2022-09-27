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
      'Access-Control-Allow-Methods': 'POST,GET',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};
