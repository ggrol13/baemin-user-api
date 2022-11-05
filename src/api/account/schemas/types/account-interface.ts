export interface AccountInterface {
  profile: {
    username: string;
    thumbnail: {
      type: string;
      default: string;
    };
  };
  email: string;
  // 소셜 계정으로 회원가입을 할 경우에는 각 서비스에서 제공되는 id 와 accessToken 을 저장합니다
  social: {
    facebook: {
      id: string;
      accessToken: string;
    };
    google: {
      id: string;
      accessToken: string;
    };
  };
  password: string; // 로컬계정의 경우엔 비밀번호를 해싱해서 저장합니다
  jwtLevel: number;
  storeId: string;
  thoughtCount: number; // 서비스에서 포스트를 작성 할 때마다 1씩 올라갑니다
  createdAt: Date;
}
