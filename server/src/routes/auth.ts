import { Router } from "express";
import { register, login } from "../controller/auth";
import { validateBody } from "../middlewares/validate";
import { userSchema } from "../utils/schema";

const router = Router();

router.post("/login", validateBody(userSchema), login);
router.post("/register", validateBody(userSchema), register);

export default router;
