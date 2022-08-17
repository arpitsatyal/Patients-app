export interface IPatient {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  dob: string;
}

export interface IPatientResponse extends IPatient {
  id: string;
  authorId?: string;
}

export interface PatientResponse {
  data: IPatientResponse[] | null;
  message: string;
}
