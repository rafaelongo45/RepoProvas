import { Router } from "express";

import signupSchema from "../schemas/signupSchema.js";
import signinSchema from "../schemas/signinSchema.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { createUser, login } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signupSchema), createUser);
authRouter.post("/signin", validateSchema(signinSchema), login);

export default authRouter;