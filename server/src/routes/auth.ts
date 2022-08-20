import { Router } from "express";
import { userSchema } from "../utils/schema";
import { validateBody } from "../middlewares/validate";
import { register, login, refresh } from "../controller/auth";

const router = Router();

router.post("/login", login);
router.post("/register", validateBody(userSchema), register);
router.post("/refresh", refresh);

export default router;
