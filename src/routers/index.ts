import { Router } from "express";

import authRouter from "./authRouter.js";
import testRouter from "./testsRouter.js";
import termsRouter from "./termsRouter.js";

const router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(termsRouter);

export default router;