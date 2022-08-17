import { NextFunction, Request, Response } from "express";
import * as patientService from '../services/patients';

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allPatients = await patientService.getAll();
  res.status(200).json({
    data: allPatients,
    message: "success.",
  });
};

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 const newPatient = patientService.create(req.body);
 res.status(200).json({
  data: newPatient,
  message: "success.",
});
};
