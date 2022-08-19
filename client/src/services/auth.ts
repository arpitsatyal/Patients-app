import { ISignUpResponse, IUser, SignUpResponse } from "../types/auth";
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4200/api",
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const patientRequests = {
  post: (url: string, body: IUser) =>
    instance.post<ISignUpResponse>(url, { body }).then(responseBody),
};

export const authService = {
  login: (patient: IUser): Promise<SignUpResponse> =>
    patientRequests.post(`/login`, patient),

  signup: (patient: IUser): Promise<SignUpResponse> =>
    patientRequests.post(`/register`, patient),
};
