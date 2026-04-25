import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { findStudent, listStudents, storeStudent } from "./student.controller";

export const studentRouter = Router();

studentRouter.get("/", asyncHandler(listStudents));
studentRouter.get("/:id", asyncHandler(findStudent));
studentRouter.post("/", asyncHandler(storeStudent));
