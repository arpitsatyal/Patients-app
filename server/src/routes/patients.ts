import { validateBody } from './../middlewares/validate';
import { auth } from "./../middlewares/authenticate";
import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatient,
  getPatients,
  markAsSpecial,
  updatePatient,
} from "../controller/patients";
import { patientSchema } from '../utils/schema';

const router = Router();

router.use(auth);

router.route("/").get(getPatients).post(validateBody(patientSchema), createPatient);

router.route("/:id").get(getPatient).put(updatePatient).delete(deletePatient);

router.put("/mark-as-special/:id", markAsSpecial);

export default router;
