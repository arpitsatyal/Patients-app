import { Router } from "express";
import {
  createPatient,
  deletePatient,
  getPatient,
  getPatients,
  imageUpload,
  markAsSpecial,
  updatePatient,
} from "../controller/patients";
import { auth } from "./../middlewares/authenticate";
import { validateBody } from "./../middlewares/validate";
import { patientSchema, updatePatientSchema } from "../utils/schema";

const router = Router();

router.use(auth);

router
  .route("/")
  .get(getPatients)
  .post(validateBody(patientSchema), createPatient);

router
  .route("/:id")
  .get(getPatient)
  .put(validateBody(updatePatientSchema), updatePatient)
  .delete(deletePatient);

router.put(
  "/mark-as-special/:id",
  validateBody(updatePatientSchema),
  markAsSpecial
);

router.post("/upload-image", imageUpload);

export default router;
