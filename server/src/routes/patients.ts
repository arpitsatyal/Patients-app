import { Router } from "express";

import { auth } from "./../middlewares/authenticate";
import { validateBody } from "./../middlewares/validate";
import * as patientController from "../controller/patients";
import { patientSchema, updatePatientSchema } from "../utils/schema";

const router = Router();

router.use(auth);

router
  .route("/")
  .get(patientController.getPatients)
  .post(validateBody(patientSchema), patientController.createPatient);

router
  .route("/:id")
  .get(patientController.getPatient)
  .put(validateBody(updatePatientSchema), patientController.updatePatient)
  .delete(patientController.deletePatient);

router.put(
  "/mark-as-special/:id",
  validateBody(updatePatientSchema),
  patientController.markAsSpecial
);

router.post("/upload-image", patientController.imageUpload);

export default router;
