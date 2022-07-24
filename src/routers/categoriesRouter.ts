import { Router } from "express";

import { validateToken } from "../middlewares/tokenValidator.js";
import { getAllCategories } from "../controllers/categoriesController.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", validateToken, getAllCategories);

export default categoriesRouter;