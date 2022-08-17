import { NextFunction, Request, Response } from "express";
import * as patientService from "../services/patients";

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPatients = await patientService.getAll();
    res.status(200).json({
      data: allPatients,
      message: "success.",
    });
  } catch (e) {
    next(e);
  }
};

export const getPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await patientService.getOne(Number(req.params.id));
    res.status(200).json({
      data: patient,
      message: "success.",
    });
  } catch (e) {
    next(e);
  }
};

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPatient = await patientService.create(req.body);
    res.status(200).json({
      data: newPatient,
      message: "success.",
    });
  } catch (e) {
    next(e);
  }
};

export const updatePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newPatient = await patientService.update(Number(req.params.id), req.body);
    res.status(200).json({
      data: newPatient,
      message: "success.",
    });
  } catch (e) {
    next(e);
  }
};

export const deletePatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await patientService.remove(Number(req.params.id));
    res.status(200).json({
      data: undefined,
      message: "success.",
    });
  } catch (e) {
    next(e);
  }
};
