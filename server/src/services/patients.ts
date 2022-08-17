import { PrismaClient } from "@prisma/client";
import { IPatient } from "../types";

const prisma = new PrismaClient();

export const getAll = async () => {
  const allPatients = await prisma.patient.findMany({});
  return allPatients;
};

export const getOne = async (id: number) => {
  const patient = await prisma.patient.findUnique({ where: { id } });
  return patient;
};

export const create = async (body: IPatient) => {
  const { firstName, lastName, email, password, contact, address, dob } = body;
  const user = await prisma.patient.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      address,
      contact,
      dob,
    },
  });
  return user;
};

export const update = async (id: number, body: IPatient) => {
  const patient = await getOne(id);
  const updatedPatient = await prisma.patient.update({
    where: {
      email: patient.email,
    },
    data: body,
  });
  return updatedPatient;
};

export const remove = async (id: number) => {
  const patient = await getOne(id);
  const updatedPatient = await prisma.patient.delete({
    where: {
      email: patient.email,
    },
  });
  return updatedPatient;
};
