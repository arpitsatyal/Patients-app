import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/User";
import { createAccessToken } from "../utils/createAccessToken";

const prisma = new PrismaClient();

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: IUser = req.body;
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
  const { name, email, password }: IUser = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  res.json(user);
};
