export interface ResponseInterface {
  statusCode: number;
  headers: {
    'Access-Control-Allow-Origin': string;
    'Access-Control-Allow-Header': string;
    'Access-Control-Allow-Credentials': boolean;
    'Access-Control-Allow-Methods': string;
    'Content-Type': string;
  };
  body: string;
}

export interface ResponseBodyInterface<T> {
  result: boolean;
  message: string;
  body: T;
}
