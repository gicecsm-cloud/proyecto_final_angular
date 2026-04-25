import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFound";
import { apiRouter } from "./routes";

export const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
    credentials: true
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Academic Management API",
    data: {
      docs: "/api/health"
    }
  });
});

app.use("/api", apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);
