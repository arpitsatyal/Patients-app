import { IUser } from "./../types/index";
import { PrismaClient } from "@prisma/client";
import { createAccessToken, createRefreshToken } from "../utils/createTokens";
import { passwordHash, decryptPassword } from "../utils/passwordHash";
import { exclude } from "../utils/excludField";

const prisma = new PrismaClient();

export const login = (body: IUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { email, password } = body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        reject({ msg: "invalid email or password"});
      }
      if (user) {
        const decryptedPassword = await decryptPassword(user.password);
        if (decryptedPassword !== password) {
          reject({ msg: "invalid email or password"});
        }
      }
      const accessToken = createAccessToken({ userId: user.id });
      const refreshToken = createRefreshToken({ userId: user.id });

      const userWithoutPassword = exclude(user, 'password');
      resolve({
        data: { accessToken, refreshToken, user: userWithoutPassword },
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
      const userWithoutPassword = exclude(user, 'password');
      resolve({
        data: { user: userWithoutPassword },
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
