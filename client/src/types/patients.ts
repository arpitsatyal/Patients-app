export interface IPatient {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact: string;
  address: string;
  dob: string;
  authorId: number;
  specialAttention: boolean;
}

export interface IPatientResponse extends IPatient {
  id: number;
}
