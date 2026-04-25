import { AppError } from "../../utils/AppError";
import {
  createCategory,
  findAllCategories,
  findCategoryById
} from "./category.repository";
import { Category, CreateCategoryDto } from "./category.types";

export async function getCategories(): Promise<Category[]> {
  return findAllCategories();
}

export async function getCategoryById(id: number): Promise<Category> {
  const category = await findCategoryById(id);

  if (!category) {
    throw new AppError("Categoria no encontrada.", 404);
  }

  return category;
}

export async function createNewCategory(dto: CreateCategoryDto): Promise<Category> {
  return createCategory(dto);
}
