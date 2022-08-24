import { AxiosResponse } from "axios";
import instance from "@/utils/axios";
import { ISignUpResponse, IUser, SignUpResponse } from "../types/auth";

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
