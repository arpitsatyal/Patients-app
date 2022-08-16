import { PrismaClient } from "@prisma/client";
import { IPatient } from "../types";

const prisma = new PrismaClient();

export const getAll = async () => {
  const allPatients = await prisma.patient.findMany({});
  return allPatients;
};

export const create = async (body: IPatient) => {
  const { firstName, lastName, email, password, contact, address, dob } = body;
  const user = await prisma.patient.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      contact,
      address,
      dob,
    },
  });
  return user;
};
