export interface IUser {
    id?: number;
    name?: string;
    email: string;
    password: string;
}

export interface IPatient {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    contact: string,
    address: string,
    dob: string,
    image: any,
    authorId: number,
    specialAttention: boolean,
    allergies: string[],
    createdAt: Date;
}

