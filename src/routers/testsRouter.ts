import { Router } from "express";

import { testSchema } from "../schemas/testsSchema.js";
import validateSchema from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidator.js";
import { createTest, getAllTests, getAllTestsCategories } from "../controllers/testsController.js";

const testRouter = Router();

testRouter.post("/create/test", validateSchema(testSchema), validateToken, createTest);
testRouter.get("/tests", validateToken, getAllTests);

export default testRouter;