import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { findCategory, listCategories, storeCategory } from "./category.controller";

export const categoryRouter = Router();

categoryRouter.get("/", asyncHandler(listCategories));
categoryRouter.get("/:id", asyncHandler(findCategory));
categoryRouter.post("/", asyncHandler(storeCategory));
