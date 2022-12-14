import prisma from "../db/client";
import { handleError } from "../utils/handleError";
import { IUser, IPatient } from "./../types/index";

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
      .catch((err) => reject(handleError(err)));
  });
};

export const getOne = (id: number): Promise<Omit<IUser, "password">> => {
  return new Promise((resolve, reject) => {
    prisma.patient
      .findUnique({ where: { id } })
      .then((patient) => resolve(patient))
      .catch((err) => reject(handleError(err)));
  });
};

export const create = async (
  body: IPatient,
  currentUser: IUser
): Promise<IPatient> => {
  return new Promise(async (resolve, reject) => {
    try {
      const authorId = currentUser.id;

      const user = await prisma.patient.create({
        data: { ...body, authorId },
      });
      resolve(user);
    } catch (e) {
      reject(handleError(e));
    }
  });
};

export const update = async (id: number, body: IPatient): Promise<IPatient> => {
  return new Promise(async (resolve, reject) => {
    try {
      const patient = await getOne(id);

      const updatedPatient = await prisma.patient.update({
        where: {
          email: patient.email,
        },
        data: body,
      });
      resolve(updatedPatient);
    } catch (e) {
      reject(handleError(e));
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
      reject(handleError(e));
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
      .catch((err) => reject(handleError(err)));
  });
};
