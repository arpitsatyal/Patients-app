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

const router = Router();

router.use(auth);

router.route("/").get(getPatients).post(createPatient);

router.route("/:id").get(getPatient).put(updatePatient).delete(deletePatient);

router.put("/mark-as-special/:id", markAsSpecial);

export default router;
