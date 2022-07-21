import { Router } from "express";

import signupSchema from "../schemas/signupSchema.js";
import signinSchema from "../schemas/signinSchema.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidator.js";
import { createUser, login, logout } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), createUser);
authRouter.post("/sign-in", validateSchema(signinSchema), login);
authRouter.post("/sign-out", validateToken, logout)

export default authRouter;