import { auth } from "./../middlewares/authenticate";
import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient,
} from "../controller/patients";

const router = Router();

router.use(auth);

router.route("/").get(getPatients).post(createPatient);

router.route("/:id").get(getPatient).put(updatePatient).delete(deletePatient);

export default router;
