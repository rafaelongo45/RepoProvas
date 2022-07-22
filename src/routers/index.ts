import { Router } from "express";

import authRouter from "./authRouter.js";
import testRouter from "./testsRouter.js";
import termsRouter from "./termsRouter.js";
import teacherRouter from "./teacherRouter.js";

const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(termsRouter);
router.use(teacherRouter);

export default router;