import { IUser } from "./../types/index";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { createAccessToken } from "../utils/createAccessToken";

const prisma = new PrismaClient();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: IUser = req.body?.body;
  if (!email || !password) {
    return next("please enter email and password.");
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return next("invalid username or password.");
  }
  //NEXT: validate password
  const accessToken = createAccessToken({ userId: user.id });

  res.status(200).json({
    data: { accessToken },
    message: "Logged in successfully...",
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password }: IUser = req.body?.body;

  if (!email || !password) {
    return next("please enter email and password.");
  }

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.status(200).json({
    data: { user },
    message: "sign up completed successfully...",
  });
};
