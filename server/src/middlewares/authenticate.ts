import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../types/index";
import { Request, Response, NextFunction } from "express";
import { getUser } from "../services/auth";

const SECRET_KEY: Secret = process.env.JWT_SECRET;

interface CustomUserRequest extends Request {
  user: IUser;
}

interface IDecoded {
  userId: number;
  iat: number;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next("Token not provided.");
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded: IDecoded) => {
    if (err) {
      return next(err);
    } else {
      const userId = decoded.userId;

      const currentUser = await getUser(userId);

        (req as CustomUserRequest).user = currentUser;
      next();
    }
  });
};
