import { Router } from "express";

import signupSchema from "../schemas/signupSchema.js";
import { createUser } from "../controllers/authController.js";
import validateSchema from "../middlewares/schemaValidator.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signupSchema), createUser);

export default authRouter;