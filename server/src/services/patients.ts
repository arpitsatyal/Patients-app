import { PrismaClient } from "@prisma/client";
import { handleError } from "../utils/handleError";

import uploadImage from "../utils/uploadImage";
import { IUser, IPatient } from "./../types/index";

const prisma = new PrismaClient();

export const getAll = (): Promise<IPatient[]> => {
  return new Promise((resolve, reject) => {
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
      .then((data) => resolve(data))
      .catch((e) => handleError(e).catch((err) => reject(err)));
  });
};

export const getOne = (id: number): Promise<Omit<IUser, "password">> => {
  return new Promise((resolve, reject) => {
    prisma.patient
      .findUnique({ where: { id } })
      .then((patient) => resolve(patient))
      .catch((e) => handleError(e).catch((err) => reject(err)));
  });
};

export const create = async (
  body: IPatient,
  currentUser: IUser
): Promise<IPatient> => {
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
      handleError(e).catch((err) => reject(err));
    }
  });
};

export const update = async (id: number, body: IPatient): Promise<IPatient> => {
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
      handleError(e).catch((err) => reject(err));
    }
  });
};

export const remove = (id: number): Promise<boolean> => {
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
      handleError(e).catch((err) => reject(err));
    }
  });
};

export const markAsSpecial = (
  body: Pick<IPatient, "specialAttention">,
  patientId: number
): Promise<any> => {
  return new Promise((resolve, reject) => {
    prisma.patient
      .updateMany({
        where: {
          id: patientId,
        },
        data: body,
      })
      .then((data) => resolve(data))
      .catch((err) => handleError(err).catch((err) => reject(err)));
  });
};
