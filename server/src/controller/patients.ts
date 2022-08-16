import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allPatients = await prisma.patient.findMany({});
  res.json(allPatients);
};

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password, contact, address, dob } =
    req.body;
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
  res.json(user);
};
