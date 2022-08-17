import { NextFunction, Request, Response } from "express";
import * as patientService from "../services/patients";
import { getUser } from "./auth";

export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPatients = await patientService.getAll();
    res.status(200).json({
      data: allPatients,
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
    const currentUser = (req as any).user;
    const newPatient = await patientService.create(req.body?.body, currentUser);
    res.status(200).json({ data: newPatient });
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
    const updatedPatient = await patientService.update(
      Number(req.params.id),
      req.body?.body
    );
    res.status(200).json({
      data: updatedPatient,
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
    res.status(204).json(null);
  } catch (e) {
    next(e);
  }
};

export const markAsSpecial = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getUser((req as any).user);
    const updatedPatient = await patientService.markAsSpecial(
      req.body?.body,
      user.id,
      Number(req.params.id)
    );
    res.status(200).json({
      data: updatedPatient,
    });
  } catch (e) {
    next(e);
  }
};
