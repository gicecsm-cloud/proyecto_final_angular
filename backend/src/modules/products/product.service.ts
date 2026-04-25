import { findCategoryById } from "../categories/category.repository";
import { AppError } from "../../utils/AppError";
import {
  createProduct,
  findAllProducts,
  findProductById,
  findProductsByCategory
} from "./product.repository";
import { CreateProductDto, Product } from "./product.types";

export async function getProducts(): Promise<Product[]> {
  return findAllProducts();
}

export async function getProductById(id: number): Promise<Product> {
  const product = await findProductById(id);

  if (!product) {
    throw new AppError("Producto no encontrado.", 404);
  }

  return product;
}

export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  const category = await findCategoryById(categoryId);

  if (!category) {
    throw new AppError("Categoria no encontrada.", 404);
  }

  return findProductsByCategory(categoryId);
}

export async function createNewProduct(dto: CreateProductDto): Promise<Product> {
  const category = await findCategoryById(dto.category_id);

  if (!category) {
    throw new AppError("La categoria indicada no existe.", 400);
  }

  return createProduct(dto);
}
