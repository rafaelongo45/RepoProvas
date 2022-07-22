import { Router } from "express";
import { getTerms } from "../controllers/termsController.js";

import { validateToken } from "../middlewares/tokenValidator.js";

const termsRouter = Router();

termsRouter.get("/terms", validateToken, getTerms)

export default termsRouter;