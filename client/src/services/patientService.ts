import { IPatientResponse, IPatient } from "./../types/patients";
import axios, { AxiosResponse } from "axios";
import { getFromLS } from "@/utils/localStorage";

const instance = axios.create({
  baseURL: "http://localhost:4200/api/patients",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getFromLS("token")}`,
  },
});

const responseBody = (response: AxiosResponse) => response.data;

const patientRequests = {
  get: (url: string) => instance.get<IPatientResponse>(url).then(responseBody),

  post: (url: string, body: IPatient) =>
    instance.post<IPatientResponse>(url, { body }).then(responseBody),

  put: (url: string, body: IPatient) =>
    instance.put<IPatientResponse>(url, { body }).then(responseBody),

  markAsSpecial: (url: string, body: boolean) =>
    instance
      .put<IPatientResponse>(url, {
        body: {
          specialAttention: body,
        },
      })
      .then(responseBody),

  delete: (url: string) => instance.delete<void>(url).then(responseBody),
};

export const Patient = {
  getPatients: (): Promise<IPatientResponse[]> => patientRequests.get(""),
  getPatient: (id: number): Promise<IPatientResponse> => patientRequests.get(`/${id}`),
  addPatient: (patient: IPatient): Promise<IPatientResponse> =>
    patientRequests.post(``, patient),
  updatePatient: (patient: IPatient, id: number): Promise<IPatientResponse> =>
    patientRequests.put(`/${id}`, patient),
  deletePatient: (id: number): Promise<void> =>
    patientRequests.delete(`/${id}`),
  markAsSpecial: (body: boolean, id: number): Promise<any> =>
    patientRequests.markAsSpecial(`/mark-as-special/${id}`, body),
};
