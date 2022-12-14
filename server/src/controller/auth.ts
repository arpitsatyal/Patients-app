import { NextFunction, Request, Response } from "express";

import * as authService from "../services/auth";
import { createAccessToken } from "./../utils/createTokens";
import { verifyRefresh } from "../utils/verifyRefreshToken";

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

export const refresh = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, refreshToken } = req.body.body;
    const isValid = verifyRefresh(id, refreshToken);
    if (!isValid) {
      return next({ msg: "invalid token" });
    }
    const newAccessToken = createAccessToken({ userId: id });
    res.status(200).json({
      data: { newAccessToken },
      message: "new access token generated...",
    });
  } catch (e) {
    next(e);
  }
};
