import { Router } from "express";
import { createPatient, getPatients } from "../controller/patients";

const router = Router();

router.route("/")
.get(getPatients)
.post(createPatient)

export default router;
