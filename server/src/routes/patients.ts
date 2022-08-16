import { auth } from './../middlewares/authenticate';
import { Router } from "express";
import { createPatient, getPatients } from "../controller/patients";

const router = Router();

router.use(auth);

router.route("/")
.get(getPatients)
.post(createPatient)

export default router;
