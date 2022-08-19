import { IUser } from "./../types/index";
import { PrismaClient } from "@prisma/client";
import { createAccessToken } from "../utils/createAccessToken";
import { passwordHash, decryptPassword } from "../utils/passwordHash";

const prisma = new PrismaClient();

export const login = (body: IUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        reject("invalid username or password.");
      }
      if (user) {
        const decryptedPassword = await decryptPassword(user.password);
        if (decryptedPassword !== password) {
          reject("invalid username or password.");
        }
      }
      const accessToken = createAccessToken({ userId: user.id });
      resolve({
        data: { accessToken, user },
        message: "Logged in successfully...",
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const register = (body: IUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, email, password } = body;

      const hashedPassword = await passwordHash(password);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      resolve({
        data: { user },
        message: "sign up completed successfully...",
      });
    } catch (e) {
      reject(e);
    }
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
