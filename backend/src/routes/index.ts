import { Router } from "express";
import { categoryRouter } from "../modules/categories/category.routes";
import { productRouter } from "../modules/products/product.routes";
import { studentRouter } from "../modules/students/student.routes";
import { taskRouter } from "../modules/tasks/task.routes";
import { healthRouter } from "./health.routes";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/students", studentRouter);
apiRouter.use("/tasks", taskRouter);
