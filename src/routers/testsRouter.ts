import { Router } from "express";

import { testSchema } from "../schemas/testsSchema.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidator.js";
import { createTest } from "../controllers/testsController.js";

const testRouter = Router();

testRouter.post("/create/test", validateSchema(testSchema), validateToken, createTest)

export default testRouter;