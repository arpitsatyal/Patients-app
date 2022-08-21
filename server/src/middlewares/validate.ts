import { userSchema, patientSchema } from "./../utils/schema";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const validateBody = (
  schema: typeof userSchema | typeof patientSchema
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = schema.validate(body.body, {});
    error ? next({ msg: error.details[0].message }) : next();
  };
};
