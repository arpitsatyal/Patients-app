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
  id: number;
  authorId?: string;
}

