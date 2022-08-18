export interface IPatient {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  dob: string;
  authorId: number;
  image: string;
  specialAttention: boolean;
  allergies: string[];
  createdAt: Date;
}

export interface IPatientResponse extends IPatient {
  id: number;
}

export interface PatientResponse {
  data: IPatientResponse | null;
  messsage?: string;
}