import { IUser } from "./../types/index";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { createAccessToken } from "../utils/createAccessToken";
import { passwordHash, decryptPassword } from "../utils/passwordHash";

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
  if(user) {
    const decryptedPassword = await decryptPassword(user.password);
    if(decryptedPassword !== password) {
      return next("invalid username or password.");
    }
  }
  const accessToken = createAccessToken({ userId: user.id });

  res.status(200).json({
    data: { accessToken, user },
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
  const hashedPassword = await passwordHash(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  res.status(200).json({
    data: { user },
    message: "sign up completed successfully...",
  });
};

export async function getUser(userId: number) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return user;
}
