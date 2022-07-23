import cors from "cors";
import express from "express";
import "express-async-errors";

import router from "./routers/index.js";
import handleError from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(handleError);

export default app;