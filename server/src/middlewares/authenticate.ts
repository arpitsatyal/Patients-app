import { IUser } from "./../types/index";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getUser } from "../controller/auth";

export const SECRET_KEY: Secret = process.env.JWT_SECRET;

export interface CustomRequest extends Request {
  user: IUser;
}

interface IDecoded {
  userId: number;
  iat: number;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return next("Token not provided.");
    }

    jwt.verify(token, SECRET_KEY, async (err, decoded: IDecoded) => {
      if (err) {
        return next(err);
      } else {
        console.log("decoded", decoded);
        const userId = decoded.userId;

        const currentUser = await getUser(userId);

        (req as CustomRequest).user = currentUser;
        next();
      }
    });
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};
