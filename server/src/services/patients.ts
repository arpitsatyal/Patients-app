import { PrismaClient } from "@prisma/client";
import uploadImage from "../utils/uploadImage";
import { IUser, IPatient } from "./../types/index";

const prisma = new PrismaClient();

export const getAll = () => {
  return new Promise((resolve, reject) => {
    try {
      prisma.patient
        .findMany({
          orderBy: [
            {
              specialAttention: "desc",
            },
            {
              firstName: "asc",
            },
          ],
        })
        .then((data) => resolve(data));
    } catch (e) {
      reject(e);
    }
  });
};

export const getOne = async (id: number) => {
  const patient = await prisma.patient.findUnique({ where: { id } });
  return patient;
};

export const create = async (body: IPatient, currentUser: IUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { firstName, lastName, email, contact, address, dob, allergies } =
        body;
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
          address,
          contact,
          dob,
          image,
          authorId,
          allergies,
        },
      });
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export const update = async (id: number, body: IPatient) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve(updatedPatient);
    } catch (e) {
      reject(e);
    }
  });
};

export const remove = (id: number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const patient = await getOne(id);
      await prisma.patient.delete({
        where: {
          email: patient.email,
        },
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

export const markAsSpecial = (body: IPatient, patientId: number) => {
  return new Promise((resolve, reject) => {
    try {
      prisma.patient
        .updateMany({
          where: {
            id: patientId,
          },
          data: body,
        })
        .then((data) => resolve(data));
    } catch (e) {
      reject(e);
    }
  });
};
