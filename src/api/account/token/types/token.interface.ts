export interface AccessTokenInterface {
  accessToken: string;
  uuid?: string;
}

export interface RefreshTokenInterface {
  refreshToken: string;
  userId: string;
  uuid: string;
}

export interface ValidatedTokenInterface {
  userId: string;
  jwtLevel: number;
  iat: number;
  exp: number;
}

export interface AccountServiceInterface<T> {
  result: boolean;
  body: T;
}

export interface ProfileInterface {
  profile: {
    username: string;
    thumbnail: {
      type: string;
      default: string;
    };
  };
}
