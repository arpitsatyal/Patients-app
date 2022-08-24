export interface IUser {
  name?: string;
  email: string;
  password: string;
}

export interface ISignUpResponse extends IUser {
  id: number;
}

type AuthResponseData = {
  accessToken: string;
  refreshToken: string;
  user: IUser;
};

export interface SignUpResponse {
  data: AuthResponseData;
  message: string;
}
