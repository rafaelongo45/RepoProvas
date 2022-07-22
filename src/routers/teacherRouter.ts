import { Router } from "express";

import { getAllTeacherDisc } from "../controllers/teachersController.js";
import { validateToken } from "../middlewares/tokenValidator.js";

const teacherRouter = Router();

teacherRouter.get("/teacher/disciplines", validateToken, getAllTeacherDisc);

export default teacherRouter;