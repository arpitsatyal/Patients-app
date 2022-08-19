import { NextFunction, Request, Response } from "express";

export const validateBody = (schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = schema.validate(body.body, {});
    error ? next(error.details[0].message) : next();
  };
};
