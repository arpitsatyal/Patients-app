import { IUser } from "./../types/index";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getUser } from "../controller/auth";

export const SECRET_KEY: Secret = process.env.JWT_SECRET;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
  user: IUser;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.header('Authorization'));
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return next("Token not provided.");
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    const userId = decoded["userId"];

    const currentUser = await getUser(userId);

    (req as any).user = currentUser;
    next();
  } catch (err) {
    res.status(401).send("Invalid token");
  }
};
