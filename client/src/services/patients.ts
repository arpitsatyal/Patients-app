import { AxiosResponse } from "axios";
import instance from "@/utils/axios";
import { IPatientResponse, IPatient } from "../types/patients";

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

  delete: (url: string) => instance.delete<any>(url).then(responseBody),
};

export const patientService = {
  getPatients: (): Promise<IPatientResponse[]> =>
    patientRequests.get("/patients"),
  getPatient: (id: number): Promise<IPatientResponse> =>
    patientRequests.get(`/patients/${id}`),
  addPatient: (patient: IPatient): Promise<IPatientResponse> =>
    patientRequests.post(`/patients`, patient),
  updatePatient: (patient: IPatient, id: number): Promise<IPatientResponse> =>
    patientRequests.put(`/patients/${id}`, patient),
  deletePatient: (id: number): Promise<any> =>
    patientRequests.delete(`/patients/${id}`),
  markAsSpecial: (body: boolean, id: number): Promise<any> =>
    patientRequests.markAsSpecial(`/patients/mark-as-special/${id}`, body),
};
