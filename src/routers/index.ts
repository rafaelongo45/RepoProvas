import { Router } from "express";

import authRouter from "./authRouter.js";
import testRouter from "./testsRouter.js";
import termsRouter from "./termsRouter.js";
import teacherRouter from "./teacherRouter.js";
import categoriesRouter from "./categoriesRouter.js";

const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(termsRouter);
router.use(teacherRouter);
router.use(categoriesRouter);

export default router;