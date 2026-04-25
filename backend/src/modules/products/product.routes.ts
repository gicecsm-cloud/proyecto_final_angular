import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  findProduct,
  listProducts,
  listProductsByCategory,
  storeProduct
} from "./product.controller";

export const productRouter = Router();

productRouter.get("/", asyncHandler(listProducts));
productRouter.get("/category/:categoryId", asyncHandler(listProductsByCategory));
productRouter.get("/:id", asyncHandler(findProduct));
productRouter.post("/", asyncHandler(storeProduct));
