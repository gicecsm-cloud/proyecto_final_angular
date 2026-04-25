import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  findTask,
  listTasks,
  listTasksByStatus,
  listTasksByStudent,
  patchTaskStatus,
  storeTask
} from "./task.controller";

export const taskRouter = Router();

taskRouter.get("/", asyncHandler(listTasks));
taskRouter.get("/status/:status", asyncHandler(listTasksByStatus));
taskRouter.get("/student/:studentId", asyncHandler(listTasksByStudent));
taskRouter.get("/:id", asyncHandler(findTask));
taskRouter.post("/", asyncHandler(storeTask));
taskRouter.patch("/:id/status", asyncHandler(patchTaskStatus));
