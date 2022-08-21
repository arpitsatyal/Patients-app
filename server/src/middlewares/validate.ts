import { NextFunction, Request, RequestHandler, Response } from "express";
import { userSchema, patientSchema, updatePatientSchema } from "./../utils/schema";

export const validateBody = (
  schema: typeof userSchema | typeof patientSchema | typeof updatePatientSchema
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    const { error } = schema.validate(body.body, {});
    error ? next({ msg: error.details[0].message }) : next();
  };
};
