import { NextFunction, Request, Response } from "express";

export const login = (req: Request, res: Response, next: NextFunction) => {
    res.send('logged in!');
}

export const register = (req: Request, res: Response, next: NextFunction) => {
    res.send('registered!');
}