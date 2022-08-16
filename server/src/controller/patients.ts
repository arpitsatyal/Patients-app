import { NextFunction, Request, Response } from "express";
import * as patientService from '../services/patients';

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allPatients = await patientService.getAll();
  res.json(allPatients);
};

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 const newPatient = patientService.create(req.body);
  res.json(newPatient);
};
