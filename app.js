import express from "express";
import morgan from "morgan";

import authRouter from "./routes/authRoute.js";
import jobRouter from "./routes/jobsRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobRouter);

export default app;
