export interface IUser {
  name?: string;
  email: string;
  password: string;
}

interface ILoginResponse {
  accessToken: string;
  user: ISignUpResponse;
}
export interface LoginResponse {
  data: ILoginResponse | null;
  message: string;
}

export interface ISignUpResponse extends IUser {
  id: number;
}
export interface SignUpResponse {
  data: ISignUpResponse | null;
  message: string;
}
