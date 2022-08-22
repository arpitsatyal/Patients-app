export interface IPatient {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address: string;
  dob: string;
  image: string;
  allergies: string[];
  specialAttention: boolean;
  createdAt: Date;
}

export interface IPatientResponse extends IPatient {
  id: number;
}
