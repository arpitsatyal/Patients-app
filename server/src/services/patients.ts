import { IUser } from "./../types/index";
import { PrismaClient } from "@prisma/client";
import { IPatient } from "../types";
import uploadImage from "../utils/uploadImage";

const prisma = new PrismaClient();

export const getAll = async () => {
  const allPatients = await prisma.patient.findMany({
    orderBy: [
      {
        specialAttention: "desc",
      },
      {
        firstName: "asc",
      },
    ],
  });
  return allPatients;
};

export const getOne = async (id: number) => {
  const patient = await prisma.patient.findUnique({ where: { id } });
  return patient;
};

export const create = async (body: IPatient, currentUser: IUser) => {
  const {
    firstName,
    lastName,
    email,
    password,
    contact,
    address,
    dob,
    allergies,
  } = body;
  const authorId = currentUser.id;
  let image: string;

  if (body.image) {
    const iData = body.image[0].thumbUrl;
    image = await uploadImage(iData);
  }
  const user = await prisma.patient.create({
    data: {
      firstName,
      lastName,
      email,
      password,
      address,
      contact,
      dob,
      image,
      authorId,
      allergies,
    },
  });
  return user;
};

export const update = async (id: number, body: IPatient) => {
  const patient = await getOne(id);
  let toUpdate = body;
  let image: string;

  if (body.image) {
    const iData = body.image[0].thumbUrl;
    image = await uploadImage(iData);
    toUpdate = { ...body, image };
  }
  const updatedPatient = await prisma.patient.update({
    where: {
      email: patient.email,
    },
    data: toUpdate,
  });
  return updatedPatient;
};

export const remove = async (id: number) => {
  const patient = await getOne(id);
  await prisma.patient.delete({
    where: {
      email: patient.email,
    },
  });
};

export const markAsSpecial = async (
  body: IPatient,
  patientId: number
) => {
  const updatedPatient = await prisma.patient.updateMany({
    where: {
      id: patientId,
    },
    data: body,
  });
  return updatedPatient;
};
