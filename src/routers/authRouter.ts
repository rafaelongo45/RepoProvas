import { Router } from "express";

import signupSchema from "../schemas/signupSchema.js";
import signinSchema from "../schemas/signinSchema.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidator.js";
import { createUser, login, logout } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signupSchema), createUser);
authRouter.post("/signin", validateSchema(signinSchema), login);
authRouter.post("/signout", validateToken, logout)

export default authRouter;