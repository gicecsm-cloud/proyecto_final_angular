import { Router } from "express";
import { query } from "../db/pool";
import { sendSuccess } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const healthRouter = Router();

healthRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const result = await query<{ now: Date }>("SELECT NOW() AS now");

    sendSuccess(res, 200, "API funcionando correctamente.", {
      status: "ok",
      database: "connected",
      timestamp: result.rows[0]?.now ?? new Date()
    });
  })
);
