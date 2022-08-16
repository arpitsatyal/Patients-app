export interface IUser {
  id?: string;
  name?: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  data: object | null;
  message: string;
}

export interface SignUpResponse {
  data: IUser | null;
  message: string;
}
