import { Request, Response } from "express";
import { sendSuccess } from "../../utils/apiResponse";
import {
  optionalString,
  parseId,
  requireBodyObject,
  requireString
} from "../../utils/validators";
import {
  createNewCategory,
  getCategories,
  getCategoryById
} from "./category.service";
import { CreateCategoryDto } from "./category.types";

export async function listCategories(_req: Request, res: Response): Promise<void> {
  const categories = await getCategories();
  sendSuccess(res, 200, "Categorias obtenidas correctamente.", categories);
}

export async function findCategory(req: Request, res: Response): Promise<void> {
  const id = parseId(req.params.id);
  const category = await getCategoryById(id);
  sendSuccess(res, 200, "Categoria obtenida correctamente.", category);
}

export async function storeCategory(req: Request, res: Response): Promise<void> {
  const body = requireBodyObject(req.body);
  const dto: CreateCategoryDto = {
    name: requireString(body.name, "name"),
    description: optionalString(body.description)
  };

  const category = await createNewCategory(dto);
  sendSuccess(res, 201, "Categoria creada correctamente.", category);
}
