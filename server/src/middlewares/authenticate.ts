import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { IUser } from "../types/index";
import { getUser } from "../services/auth";

const SECRET_KEY: Secret = process.env.JWT_SECRET;

interface CustomUserRequest extends Request {
  user: IUser;
}

export interface IDecoded {
  userId: number;
  iat: number;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return next({ msg: "Token not provided." });
  }

  jwt.verify(token, SECRET_KEY, async (err, decoded: IDecoded) => {
    if (err) {
      if (err.message === "jwt expired") {
        return next({ statusCode: 401, msg: err.message });
      }
      return next({ msg: err });
    } else {
      const userId = decoded.userId;

      const currentUser = await getUser(userId);

      (req as CustomUserRequest).user = currentUser;
      next();
    }
  });
};
