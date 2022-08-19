import { NextFunction, Request, Response } from "express";
import * as authService from "../services/auth";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await authService.login(req.body.body);
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await authService.register(req.body.body);
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
};
