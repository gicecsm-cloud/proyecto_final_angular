import { Request, Response } from "express";
import { sendSuccess } from "../../utils/apiResponse";
import {
  parseId,
  requireBodyObject,
  requireNonNegativeInteger,
  requireNonNegativeNumber,
  requirePositiveInteger,
  requireString
} from "../../utils/validators";
import {
  createNewProduct,
  getProductById,
  getProducts,
  getProductsByCategory
} from "./product.service";
import { CreateProductDto } from "./product.types";

export async function listProducts(_req: Request, res: Response): Promise<void> {
  const products = await getProducts();
  sendSuccess(res, 200, "Productos obtenidos correctamente.", products);
}

export async function findProduct(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  const product = await getProductById(id);
  sendSuccess(res, 200, "Producto obtenido correctamente.", product);
}

export async function listProductsByCategory(req: Request, res: Response): Promise<void> {
  const categoryId = parseId(req.params.categoryId, "categoryId");
  const products = await getProductsByCategory(categoryId);
  sendSuccess(res, 200, "Productos por categoria obtenidos correctamente.", products);
}

export async function storeProduct(req: Request, res: Response): Promise<void> {
  const body = requireBodyObject(req.body);
  const dto: CreateProductDto = {
    name: requireString(body.name, "name"),
    price: requireNonNegativeNumber(body.price, "price"),
    stock: requireNonNegativeInteger(body.stock, "stock"),
    category_id: requirePositiveInteger(body.category_id, "category_id")
  };

  const product = await createNewProduct(dto);
  sendSuccess(res, 201, "Producto creado correctamente.", product);
}
